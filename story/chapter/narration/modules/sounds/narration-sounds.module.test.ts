import { describe, expect, test } from "bun:test"
import { soundedOf } from "akasha/story/chapter/narration/modules/sounds/narration-sounds.module.code.ts"

describe("soundedOf", () => {
  test("a word broken off before its vowel is said with one", () => {
    expect(soundedOf("“Wh—” She stopped. “Th... that’s it. Str– no.”")).toBe(
      "“Whuh—” She stopped. “Thuh... that’s it. Struh– no.”"
    )
  })

  test("a sound with no vowel broken off is given no added uh", () => {
    expect(soundedOf("“Hmm… Shh— Tsk...”")).toBe("“Hmm… Shh— Tsk...”")
  })

  test("a word with a vowel is left as written", () => {
    expect(soundedOf("Mr. Brt went— away.")).toBe("Mr. Brt went— away.")
  })
})
