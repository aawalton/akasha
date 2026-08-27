import { describe, expect, test } from "bun:test"
import {
  GATE_VERDICT_OVERALLS,
  GateFindingSchema,
  GateVerdictSchema,
  gateVerdictCoverage,
  isGateCoverageComplete,
  parseGateVerdict,
} from "./gate-verdict-schema"

const VALID = {
  overall: "PASS",
  turnExternalId: "turn-7",
  attempts: 1,
} as const

describe("GateVerdictSchema", () => {
  test("a minimal valid verdict parses", () => {
    const parsed = GateVerdictSchema.safeParse(VALID)
    expect(parsed.success).toBe(true)
    if (!parsed.success) throw new Error("expected success")
    expect(parsed.data.overall).toBe("PASS")
    expect(parsed.data.turnExternalId).toBe("turn-7")
    expect(parsed.data.attempts).toBe(1)
  })

  test("every overall member is accepted", () => {
    for (const overall of GATE_VERDICT_OVERALLS) {
      const parsed = GateVerdictSchema.safeParse({ ...VALID, overall })
      expect(parsed.success).toBe(true)
    }
  })

  test("diagnostics ride the optional detail escape hatch", () => {
    const parsed = GateVerdictSchema.safeParse({
      ...VALID,
      overall: "PASS-repaired",
      attempts: 3,
      detail: { checks: { voice: 6 }, repairLog: "tightened the opening beat" },
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) throw new Error("expected success")
    expect(parsed.data.detail?.checks).toEqual({ voice: 6 })
  })

  test("an unknown top-level key is refused (strict spine)", () => {
    const parsed = GateVerdictSchema.safeParse({ ...VALID, summary: "leaked prose" })
    expect(parsed.success).toBe(false)
  })

  test("an unknown overall value is refused", () => {
    const parsed = GateVerdictSchema.safeParse({ ...VALID, overall: "MAYBE" })
    expect(parsed.success).toBe(false)
  })

  test("a missing required field is refused", () => {
    expect(GateVerdictSchema.safeParse({ overall: "PASS", attempts: 1 }).success).toBe(false)
    expect(GateVerdictSchema.safeParse({ overall: "PASS", turnExternalId: "turn-7" }).success).toBe(
      false
    )
  })

  test("a negative or fractional attempts count is refused", () => {
    expect(GateVerdictSchema.safeParse({ ...VALID, attempts: -1 }).success).toBe(false)
    expect(GateVerdictSchema.safeParse({ ...VALID, attempts: 1.5 }).success).toBe(false)
  })

  test("author is optional — a historical verdict without one still parses (no retroactive migration)", () => {
    const parsed = GateVerdictSchema.safeParse(VALID)
    expect(parsed.success).toBe(true)
    if (!parsed.success) throw new Error("expected success")
    expect(parsed.data.author).toBeUndefined()
  })

  test("a present author parses and round-trips", () => {
    const parsed = GateVerdictSchema.safeParse({ ...VALID, author: "weave-gate-3" })
    expect(parsed.success).toBe(true)
    if (!parsed.success) throw new Error("expected success")
    expect(parsed.data.author).toBe("weave-gate-3")
  })

  test("an empty-string author is refused (min(1)) — an attributable field is never blank", () => {
    expect(GateVerdictSchema.safeParse({ ...VALID, author: "" }).success).toBe(false)
  })
})

describe("parseGateVerdict", () => {
  test("a valid verdict parses to the typed value", () => {
    const verdict = parseGateVerdict({ ...VALID, overall: "EXHAUSTED", attempts: 4 })
    expect(verdict).not.toBeNull()
    expect(verdict?.overall).toBe("EXHAUSTED")
  })

  test("an absent verdict (null / undefined) is null", () => {
    expect(parseGateVerdict(null)).toBeNull()
    expect(parseGateVerdict(undefined)).toBeNull()
  })

  test("a malformed verdict collapses to null (fail-closed, same as absent)", () => {
    expect(parseGateVerdict({ overall: "PASS" })).toBeNull()
    expect(parseGateVerdict({ ...VALID, overall: "NOPE" })).toBeNull()
    expect(parseGateVerdict({ ...VALID, summary: "x" })).toBeNull()
    expect(parseGateVerdict("not an object")).toBeNull()
    expect(parseGateVerdict(42)).toBeNull()
  })
})

describe("GateFindingSchema — the per-dimension finding shape", () => {
  const OK = { dimension: "window-pane-prose", verdict: "clean", evidence: "no ornament" } as const

  test("a well-formed finding parses", () => {
    expect(GateFindingSchema.safeParse(OK).success).toBe(true)
  })

  test("every finding verdict member is accepted", () => {
    for (const verdict of ["clean", "finding", "suspended"]) {
      expect(GateFindingSchema.safeParse({ ...OK, verdict }).success).toBe(true)
    }
  })

  test("a drifted verdict value ('warn') is REFUSED — the closed enum, not synonym-accepted", () => {
    expect(GateFindingSchema.safeParse({ ...OK, verdict: "warn" }).success).toBe(false)
  })

  test("a drifted key ('principle' for 'dimension') is REFUSED — strict spine, not aliased", () => {
    expect(
      GateFindingSchema.safeParse({
        principle: "window-pane-prose",
        verdict: "clean",
        evidence: "x",
      }).success
    ).toBe(false)
  })

  test("empty evidence is REFUSED (the 'didn't really check' shape; suspended needs its reason here too)", () => {
    expect(GateFindingSchema.safeParse({ ...OK, evidence: "" }).success).toBe(false)
    expect(GateFindingSchema.safeParse({ ...OK, verdict: "suspended", evidence: "" }).success).toBe(
      false
    )
  })

  test("an empty dimension id is REFUSED", () => {
    expect(GateFindingSchema.safeParse({ ...OK, dimension: "" }).success).toBe(false)
  })

  test("an extra per-finding key is REFUSED (supplements ride verdict-level detail, not the finding)", () => {
    expect(GateFindingSchema.safeParse({ ...OK, note: "aside" }).success).toBe(false)
  })
})

describe("GateVerdictSchema — findings ride the strict spine", () => {
  test("a verdict with a well-formed findings census parses", () => {
    const parsed = GateVerdictSchema.safeParse({
      ...VALID,
      findings: [{ dimension: "window-pane-prose", verdict: "clean", evidence: "plain" }],
      detail: { boundaryTally: { t007: "poised" } },
    })
    expect(parsed.success).toBe(true)
  })

  test("findings is optional (a verdict may carry none — coverage is enforced at gate-turn)", () => {
    expect(GateVerdictSchema.safeParse(VALID).success).toBe(true)
  })

  test("a malformed finding inside the array fails the whole parse", () => {
    const parsed = GateVerdictSchema.safeParse({
      ...VALID,
      findings: [{ dimension: "x", verdict: "warn", evidence: "y" }],
    })
    expect(parsed.success).toBe(false)
  })
})

describe("gateVerdictCoverage — the pure set-relationship check", () => {
  const REGISTRY = ["a", "b", "c"]
  const f = (dimension: string) => ({ dimension, verdict: "clean" as const, evidence: "e" })

  test("exact coverage has no gaps and is complete", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [f("a"), f("b"), f("c")])
    expect(gaps).toEqual({ missing: [], invented: [], duplicate: [] })
    expect(isGateCoverageComplete(gaps)).toBe(true)
  })

  test("absent findings ⇒ every registry dimension missing (the empty-findings hole)", () => {
    const gaps = gateVerdictCoverage(REGISTRY, undefined)
    expect(gaps.missing).toEqual(["a", "b", "c"])
    expect(isGateCoverageComplete(gaps)).toBe(false)
  })

  test("a partial census reports exactly the uncovered dimensions", () => {
    expect(gateVerdictCoverage(REGISTRY, [f("a")]).missing).toEqual(["b", "c"])
  })

  test("an out-of-registry dimension is reported as invented", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [f("a"), f("b"), f("c"), f("z")])
    expect(gaps.invented).toEqual(["z"])
    expect(gaps.missing).toEqual([])
  })

  test("a repeated dimension is reported as duplicate (and not double-counted as missing)", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [f("a"), f("a"), f("b"), f("c")])
    expect(gaps.duplicate).toEqual(["a"])
    expect(gaps.missing).toEqual([])
  })

  test("all three gap kinds surface together in one pass", () => {
    const gaps = gateVerdictCoverage(REGISTRY, [f("a"), f("a"), f("z")])
    expect(gaps.missing).toEqual(["b", "c"])
    expect(gaps.invented).toEqual(["z"])
    expect(gaps.duplicate).toEqual(["a"])
    expect(isGateCoverageComplete(gaps)).toBe(false)
  })

  test("registry order is preserved in the missing/duplicate lists (deterministic message)", () => {
    expect(gateVerdictCoverage(["c", "b", "a"], [f("b")]).missing).toEqual(["c", "a"])
  })
})
