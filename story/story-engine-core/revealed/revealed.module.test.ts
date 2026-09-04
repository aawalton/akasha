import { describe, expect, test } from "bun:test"
import {
  DEFAULT_REVEAL_KEYS,
  narrowRevealed,
  REVEAL_UNIVERSE_KEYS,
  RevealKeySchema,
} from "./revealed.module.code.ts"

describe("RevealKeySchema", () => {
  test("admits a key the code names", () => {
    expect(RevealKeySchema.safeParse("skills").success).toBe(true)
  })

  test("refuses a key the code does not name", () => {
    expect(RevealKeySchema.safeParse("secret-plans").success).toBe(false)
  })
})

describe("REVEAL_UNIVERSE_KEYS", () => {
  test("is what a game gets when it asks for nothing", () => {
    expect(DEFAULT_REVEAL_KEYS).toEqual(REVEAL_UNIVERSE_KEYS)
  })

  test("holds the sheet's own keys", () => {
    expect(REVEAL_UNIVERSE_KEYS).toContain("name")
    expect(REVEAL_UNIVERSE_KEYS).toContain("derived")
  })
})

describe("narrowRevealed", () => {
  test("keeps only the asked-for keys", () => {
    expect(narrowRevealed({ name: "Aria", level: 3, class: "seer" }, ["name", "level"])).toEqual({
      name: "Aria",
      level: 3,
    })
  })

  test("asking for a key the sheet lacks adds nothing", () => {
    expect(narrowRevealed({ name: "Aria" }, ["name", "titles"])).toEqual({ name: "Aria" })
  })

  test("asking for nothing yields an empty sheet", () => {
    expect(narrowRevealed({ name: "Aria", level: 3 }, [])).toEqual({})
  })

  test("a key outside the code universe cannot be carried through", () => {
    const sheet = { name: "Aria" } as Record<string, unknown>
    sheet.secret = "hidden"
    expect(narrowRevealed(sheet, ["name", "secret"])).toEqual({ name: "Aria" })
  })
})
