import { describe, expect, test } from "bun:test"
import {
  PoolChangeSchema,
  TurnPackageSchema,
  type TurnPackageViolation,
  validateTurnPackage,
} from "./turn-package-schema"

const MINIMAL = {
  playerAction: "I push open the iron door.",
  worldResponse: "The door groans inward onto a dark stair.",
}

const FULL = {
  playerAction: "I drink the flask and charge the ogre.",
  worldResponse: "The draught burns; you close the distance as the ogre turns.",
  poolChanges: [
    { pool: "hp", delta: -6, newTotal: 22 },
    { pool: "xp", delta: 40, newTotal: 340 },
  ],
  gmOnly: { ogreInitiative: 14, ambushPending: true },
}

function fields(violations: readonly TurnPackageViolation[]): readonly string[] {
  return violations.map((v) => v.field)
}

describe("validateTurnPackage — accepts well-formed packages", () => {
  test("a minimal package validates and defaults poolChanges to []", () => {
    const result = validateTurnPackage(MINIMAL)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.playerAction).toBe(MINIMAL.playerAction)
      expect(result.value.worldResponse).toBe(MINIMAL.worldResponse)
      expect(result.value.poolChanges).toEqual([])
    }
  })

  test("a full package preserves pool changes verbatim and carries gmOnly", () => {
    const result = validateTurnPackage(FULL)
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.value.poolChanges).toHaveLength(2)
      expect(result.value.poolChanges[0]).toEqual({ pool: "hp", delta: -6, newTotal: 22 })
      expect(result.value.gmOnly).toEqual({ ogreInitiative: 14, ambushPending: true })
    }
  })

  test("playerAction is preserved BYTE-for-byte (the verbatim contract)", () => {
    const verbatim = "  i say, quietly, 'we should not be here' — and step back.  "
    const result = validateTurnPackage({ ...MINIMAL, playerAction: verbatim })
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.value.playerAction).toBe(verbatim)
  })
})

describe("validateTurnPackage — the player-agency clause (playerAction)", () => {
  test("an EMPTY playerAction is refused (PC-scripting made structurally visible)", () => {
    const result = validateTurnPackage({ ...MINIMAL, playerAction: "" })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("playerAction")
  })

  test("a MISSING playerAction is refused", () => {
    const { playerAction, ...withoutAction } = MINIMAL
    void playerAction
    const result = validateTurnPackage(withoutAction)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("playerAction")
  })
})

describe("validateTurnPackage — the player-visible-numbers clause (poolChanges)", () => {
  test("a pool change stating a delta WITHOUT its newTotal is refused (turn-18/19 class)", () => {
    const result = validateTurnPackage({
      ...MINIMAL,
      poolChanges: [{ pool: "hp", delta: -6 }],
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("poolChanges.0.newTotal")
  })

  test("a pool change without its pool name is refused", () => {
    const result = validateTurnPackage({
      ...MINIMAL,
      poolChanges: [{ delta: -6, newTotal: 22 }],
    })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(fields(result.violations)).toContain("poolChanges.0.pool")
  })

  test("PoolChangeSchema rejects an unknown key (.strict())", () => {
    const parsed = PoolChangeSchema.safeParse({
      pool: "hp",
      delta: -6,
      newTotal: 22,
      reason: "trap",
    })
    expect(parsed.success).toBe(false)
  })
})

describe("validateTurnPackage — strictness + one-pass reporting", () => {
  test("an unknown TOP-LEVEL key is refused (.strict() spine)", () => {
    const result = validateTurnPackage({ ...MINIMAL, narration: "the GM already wrote prose" })
    expect(result.ok).toBe(false)
  })

  test("EVERY violation is collected in one pass (no fix-one-at-a-time round-trips)", () => {
    const result = validateTurnPackage({
      playerAction: "",
      poolChanges: [{ pool: "hp", delta: -6 }],
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      const f = fields(result.violations)
      expect(f).toContain("playerAction")
      expect(f).toContain("worldResponse")
      expect(f).toContain("poolChanges.0.newTotal")
    }
  })

  test("TurnPackageSchema.parse round-trips a valid package", () => {
    expect(() => TurnPackageSchema.parse(FULL)).not.toThrow()
  })
})
