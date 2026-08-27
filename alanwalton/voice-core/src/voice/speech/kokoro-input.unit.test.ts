import { describe, expect, test } from "bun:test"
import { buildKokoroSpeechInput } from "../speech"

describe("buildKokoroSpeechInput", () => {
  test("strips a paragraph-leading speaker marker so it is never read aloud", () => {
    expect(buildKokoroSpeechInput("[zadi] Hello there.")).toBe("Hello there.")
  })

  test("strips markers on each paragraph but keeps a mid-paragraph bracket literal", () => {
    const input = "[amy] First line.\n\nThe word [sic] appears here."
    expect(buildKokoroSpeechInput(input)).toBe("First line. The word [sic] appears here.")
  })

  test("flattens markdown structure (headings, emphasis, links)", () => {
    const input = "# Title\n\nA **bold** word and a [link](https://x.test) here."
    expect(buildKokoroSpeechInput(input)).toBe("Title A bold word and a link here.")
  })

  test("returns the empty string for whitespace-only or marker-only input", () => {
    expect(buildKokoroSpeechInput("   \n\n  ")).toBe("")
    expect(buildKokoroSpeechInput("[zadi]")).toBe("")
  })
})
