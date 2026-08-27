import { describe, expect, test } from "bun:test"
import {
  FogRefSchema,
  FogReportSchema,
  type FogReportViolation,
  validateFogReport,
} from "./fog-report-schema"

const MINIMAL = {
  seat: "resolver",
}

const FULL = {
  seat: "worldbuilder",
  counts: { entitiesAuthored: 3, sectionsExtended: 1 },
  refs: [
    { kind: "entity", slug: "vault-a1b2c3d4" },
    { kind: "section", slug: "home-base-depth" },
  ],
  gmOnly: { trigger: "floor-5-reach", thin: ["east-wing"] },
}

function fields(violations: readonly FogReportViolation[]): readonly string[] {
  return violations.map((v) => v.field)
}

describe("validateFogReport — accepts well-formed reports", () => {
  test("the loremaker seat (#15324) is an accepted seat value, and worldbuilder is retained transitionally", () => {
    for (const seat of ["loremaker", "worldbuilder", "resolver"]) {
      expect(validateFogReport({ seat }).ok).toBe(true)
    }
  })

  test("a minimal report validates and defaults counts/refs to empty", () => {
    const result = validateFogReport(MINIMAL)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.seat).toBe("resolver")
      expect(result.value.counts).toEqual({})
      expect(result.value.refs).toEqual([])
    }
  })

  test("a full report preserves counts, refs, and the fog-marked gmOnly block", () => {
    const result = validateFogReport(FULL)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.counts).toEqual({ entitiesAuthored: 3, sectionsExtended: 1 })
      expect(result.value.refs).toHaveLength(2)
      expect(result.value.refs[0]).toEqual({ kind: "entity", slug: "vault-a1b2c3d4" })
      expect(result.value.gmOnly).toEqual({ trigger: "floor-5-reach", thin: ["east-wing"] })
    }
  })

  test("FogReportSchema.parse round-trips a full report", () => {
    expect(() => FogReportSchema.parse(FULL)).not.toThrow()
  })
})

describe("validateFogReport — the seat clause", () => {
  test("a MISSING seat is refused", () => {
    const result = validateFogReport({ counts: { x: 1 } })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("seat")
  })

  test("an UNKNOWN seat is refused (npc-voice is not a built seat yet)", () => {
    const result = validateFogReport({ seat: "npc-voice" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("seat")
  })
})

describe("validateFogReport — structural refs carry ids, never content", () => {
  test("a ref missing its slug is refused", () => {
    const result = validateFogReport({ seat: "resolver", refs: [{ kind: "entity" }] })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("refs.0.slug")
  })

  test("a ref with an empty slug is refused", () => {
    const result = validateFogReport({ seat: "resolver", refs: [{ kind: "entity", slug: "" }] })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("refs.0.slug")
  })

  test("a ref with an unknown kind is refused", () => {
    const result = validateFogReport({
      seat: "resolver",
      refs: [{ kind: "secret-name", slug: "x" }],
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("refs.0.kind")
  })

  test("FogRefSchema rejects an extra key (.strict()) — no content field can ride", () => {
    const parsed = FogRefSchema.safeParse({
      kind: "entity",
      slug: "vault-a1b2c3d4",
      summary: "the hidden vault of the drowned king",
    })
    expect(parsed.success).toBe(false)
  })
})

describe("validateFogReport — counts are non-negative integers", () => {
  test("a negative count is refused", () => {
    const result = validateFogReport({ seat: "resolver", counts: { entitiesAuthored: -1 } })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("counts.entitiesAuthored")
  })

  test("a non-integer count is refused", () => {
    const result = validateFogReport({ seat: "resolver", counts: { entitiesAuthored: 1.5 } })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("counts.entitiesAuthored")
  })
})

describe("validateFogReport — strictness + one-pass reporting", () => {
  test("an unknown TOP-LEVEL key is refused (.strict() spine — no free-text content field)", () => {
    const result = validateFogReport({ seat: "resolver", summary: "what actually happened" })
    expect(result.ok).toBe(false)
  })

  test("gmOnly is the ONLY place content-laden facts may ride (arbitrary shape allowed)", () => {
    const result = validateFogReport({
      seat: "worldbuilder",
      gmOnly: { anything: { nested: true }, list: [1, 2, 3] },
    })
    expect(result.ok).toBe(true)
  })

  test("EVERY violation is collected in one pass", () => {
    const result = validateFogReport({
      refs: [{ kind: "entity" }],
      counts: { x: -1 },
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      const f = fields(result.violations)
      expect(f).toContain("seat")
      expect(f).toContain("refs.0.slug")
      expect(f).toContain("counts.x")
    }
  })
})
