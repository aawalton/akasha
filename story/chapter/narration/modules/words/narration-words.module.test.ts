import { describe, expect, test } from "bun:test"
import { numberedOf } from "akasha/story/chapter/narration/modules/words/narration-words.module.code.ts"

describe("numberedOf", () => {
  test("a numeral after a name is said as an ordinal", () => {
    expect(numberedOf("King Itorin II met Othius IV and the Grimalkin II's crew.")).toBe(
      "King Itorin the Second met Othius the Fourth and the Grimalkin the Second's crew."
    )
  })

  test("a numeral after a counting word is said as a number", () => {
    expect(numberedOf("World War II, Episode III and Mk. VII armor.")).toBe(
      "World War Two, Episode Three and Mk. Seven armor."
    )
  })

  test("a lone capital, a lowercase word and a single letter are left as written", () => {
    expect(numberedOf("I II, and II, Viscount V, Merchant X, ARMY II.")).toBe(
      "I II, and II, Viscount V, Merchant X, ARMY II."
    )
  })
})
