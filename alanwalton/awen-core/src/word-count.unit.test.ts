import { describe, expect, test } from "bun:test"
import { wordCount } from "./word-count"

describe("wordCount — whitespace-delimited tokens, empties dropped", () => {
  test("empty string is zero", () => {
    expect(wordCount("")).toBe(0)
  })

  test("whitespace-only string is zero", () => {
    expect(wordCount("   \n\t  ")).toBe(0)
  })

  test("a single word is one", () => {
    expect(wordCount("word")).toBe(1)
  })

  test("counts space-separated words", () => {
    expect(wordCount("two words")).toBe(2)
  })

  test("collapses runs of whitespace — no empty tokens counted", () => {
    expect(wordCount("  many   spaces    between  ")).toBe(3)
  })

  test("counts across newlines and tabs as whitespace", () => {
    expect(wordCount("line one\nline\ttwo\n\nline three")).toBe(6)
  })

  test("punctuation attached to a token does not split it", () => {
    expect(wordCount("punctuation, doesn't; split! words? no.")).toBe(5)
  })
})
