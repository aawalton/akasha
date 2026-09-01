import { describe, expect, test } from "bun:test"
import {
  DesignContentSchema,
  decideDesignCompleteness,
  designKindOf,
  isDesignKind,
} from "./design-schema.module.code.ts"

const FLOOR = {
  kind: "floor-design" as const,
  challenge: "cross the span",
  enemies: [{ name: "wight" }],
  items: [{ name: "lantern" }],
}

describe("isDesignKind", () => {
  test("names the three kinds", () => {
    expect(isDesignKind("companion-design")).toBe(true)
    expect(isDesignKind("floor-design")).toBe(true)
    expect(isDesignKind("world-logic")).toBe(true)
  })

  test("refuses a kind the code does not name", () => {
    expect(isDesignKind("weather-design")).toBe(false)
  })
})

describe("designKindOf", () => {
  test("reads the kind off the content", () => {
    expect(designKindOf({ ...FLOOR, challengeOwner: "character" })).toBe("floor-design")
  })
})

describe("DesignContentSchema", () => {
  test("a player-owned floor with no clues is refused", () => {
    const read = DesignContentSchema.safeParse({ ...FLOOR, challengeOwner: "player" })
    expect(read.success).toBe(false)
  })

  test("a player-owned floor dealing its clues is admitted", () => {
    const read = DesignContentSchema.safeParse({
      ...FLOOR,
      challengeOwner: "player",
      clues: [{ component: "the seal", dealSite: "turn 4" }],
    })
    expect(read.success).toBe(true)
  })

  test("a character-owned floor needs no clues", () => {
    expect(DesignContentSchema.safeParse({ ...FLOOR, challengeOwner: "character" }).success).toBe(
      true
    )
  })
})

describe("decideDesignCompleteness", () => {
  test("a companion talent with its trigger is finished", () => {
    expect(
      decideDesignCompleteness({
        kind: "companion-design",
        talent: "second sight",
        activation: "when the bearer bleeds",
      })
    ).toEqual({ ok: true })
  })

  test("a companion talent without its trigger is unfinished", () => {
    const decided = decideDesignCompleteness({
      kind: "companion-design",
      talent: "second sight",
      activation: "   ",
    })
    expect(decided.ok).toBe(false)
    expect(decided.reason).toContain("activation")
  })

  test("a floor with no challenge owner is unfinished", () => {
    const decided = decideDesignCompleteness(FLOOR)
    expect(decided.ok).toBe(false)
    expect(decided.reason).toContain("challengeOwner")
  })

  test("a player-owned floor with no clues is unfinished", () => {
    const decided = decideDesignCompleteness({ ...FLOOR, challengeOwner: "player", clues: [] })
    expect(decided.ok).toBe(false)
    expect(decided.reason).toContain("clue")
  })

  test("a floor with an empty enemy roster is unfinished", () => {
    const decided = decideDesignCompleteness({
      ...FLOOR,
      enemies: [],
      challengeOwner: "character",
    })
    expect(decided.reason).toContain("enemy roster")
  })

  test("a floor with no items is unfinished", () => {
    const decided = decideDesignCompleteness({ ...FLOOR, items: [], challengeOwner: "character" })
    expect(decided.reason).toContain("item inventory")
  })

  test("a fully designed floor is finished", () => {
    expect(decideDesignCompleteness({ ...FLOOR, challengeOwner: "character" })).toEqual({
      ok: true,
    })
  })

  test("a world rule needs only its rule", () => {
    expect(decideDesignCompleteness({ kind: "world-logic", rule: "iron forgets" })).toEqual({
      ok: true,
    })
    expect(decideDesignCompleteness({ kind: "world-logic", rule: " " }).ok).toBe(false)
  })
})
