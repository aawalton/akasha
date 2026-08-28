import { describe, expect, test } from "bun:test"
import { resolveRevealKeys } from "./reveal-spec.ts"
import {
  DEFAULT_REVEAL_KEYS,
  narrowRevealed,
  REVEAL_UNIVERSE_KEYS,
  RevealedSheetSchema,
} from "./revealed.ts"

describe("the reveal universe IS the code-defined floor", () => {
  test("REVEAL_UNIVERSE_KEYS equals the RevealedSheetSchema shape keys (no drift)", () => {
    expect(Object.keys(RevealedSheetSchema.shape).sort()).toEqual([...REVEAL_UNIVERSE_KEYS].sort())
  })

  test("DEFAULT_REVEAL_KEYS (the code default) is the whole universe — today's show-everything", () => {
    expect([...DEFAULT_REVEAL_KEYS].sort()).toEqual([...REVEAL_UNIVERSE_KEYS].sort())
  })

  test("every universe key is genuinely a RevealedSheetSchema key", () => {
    for (const key of REVEAL_UNIVERSE_KEYS) {
      expect(Object.keys(RevealedSheetSchema.shape)).toContain(key)
    }
  })
})

describe("resolveRevealKeys — declared, then the code default, wholesale", () => {
  test("a game's own list wins over the default", () => {
    expect(resolveRevealKeys(["name"])).toEqual(["name"])
  })

  test("an empty declared list wins — it is a real selection, not absence", () => {
    expect(resolveRevealKeys([])).toEqual([])
  })

  test("an undeclared list reads as the whole universe", () => {
    expect([...resolveRevealKeys(undefined)].sort()).toEqual([...REVEAL_UNIVERSE_KEYS].sort())
  })
})

describe("narrowRevealed — subtractive-only strip (default-closed, floor re-enforced)", () => {
  const FULL = RevealedSheetSchema.parse({
    name: "Aria",
    level: 5,
    attributes: { PRESENCE: 3 },
    skills: [{ name: "Bond" }],
    affinities: [{ name: "The Link", value: 1 }],
    titles: ["Companion"],
  })

  test("keeps only the selected keys; an unselected key is stripped", () => {
    const narrowed = narrowRevealed(FULL, ["name", "level"])
    expect(narrowed).toEqual({ name: "Aria", level: 5 })
    expect(narrowed.attributes).toBeUndefined()
    expect(narrowed.skills).toBeUndefined()
    expect(narrowed.affinities).toBeUndefined()
  })

  test("the whole universe selection is the identity (today's show-everything)", () => {
    const narrowed = narrowRevealed(FULL, [...DEFAULT_REVEAL_KEYS])
    expect(narrowed).toEqual(FULL)
  })

  test("an out-of-universe key in the list can NEVER widen the output (floor re-parse)", () => {
    const narrowed = narrowRevealed(FULL, ["name", "traits", "designerNotes"])
    expect(narrowed).toEqual({ name: "Aria" })
    expect(Object.keys(narrowed)).not.toContain("traits")
  })

  test("empty selection strips everything", () => {
    expect(narrowRevealed(FULL, [])).toEqual({})
  })
})
