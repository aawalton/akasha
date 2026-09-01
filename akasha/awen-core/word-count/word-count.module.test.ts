import { describe, expect, test } from "bun:test"
import { wordCount } from "./word-count.module.code.ts"

describe("wordCount", () => {
  test("counts whitespace-separated words", () => {
    expect(wordCount("one two three")).toBe(3)
  })

  test("is zero for text holding only whitespace", () => {
    expect(wordCount("   \n\t  ")).toBe(0)
  })

  test("collapses runs of whitespace", () => {
    expect(wordCount("  one   two \n\n three  ")).toBe(3)
  })

  test("counts punctuation attached to a word as part of it", () => {
    expect(wordCount("Stay, she said.")).toBe(3)
  })
})
