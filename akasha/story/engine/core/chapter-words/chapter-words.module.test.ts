import { describe, expect, test } from "bun:test"
import { chapterWords } from "./chapter-words.module.code.ts"

describe("chapterWords", () => {
  test("counts every word where no paragraph opens with a marker", () => {
    expect(chapterWords("she opened it slowly\n\nand went in")).toBe(7)
  })

  test("leaves out the marker a paragraph opens with", () => {
    expect(chapterWords("[awen] she opened it")).toBe(3)
  })

  test("leaves out a marker on each paragraph rather than the first alone", () => {
    expect(chapterWords("[awen] one two\n\n[alan] three four")).toBe(4)
  })

  test("counts a bracketed word that does not open its paragraph", () => {
    expect(chapterWords("she said [awen] once")).toBe(4)
  })

  test("counts a marker the pattern does not admit", () => {
    expect(chapterWords("[Awen] one two")).toBe(3)
    expect(chapterWords("[9lives] one two")).toBe(3)
  })

  test("takes the whitespace before a marker with it", () => {
    expect(chapterWords("   [awen]   one")).toBe(1)
  })

  test("is zero for text holding no word", () => {
    expect(chapterWords("")).toBe(0)
    expect(chapterWords("[awen]")).toBe(0)
  })
})
