import { describe, expect, test } from "bun:test"
import { countParagraphs, countSentences, countWords } from "../tally"

describe("structural counters", () => {
  test("countWords counts whitespace tokens carrying a letter/number", () => {
    expect(countWords('"Stay," she said.')).toBe(3)
    expect(countWords("  ...  —  ")).toBe(0)
    expect(countWords("one two three")).toBe(3)
  })

  test("countSentences counts terminal-punctuation runs", () => {
    expect(countSentences("One. Two! Three?")).toBe(3)
    expect(countSentences("no terminator")).toBe(0)
    expect(countSentences("wait... really?!")).toBe(2)
  })

  test("countParagraphs counts non-empty newline-separated blocks", () => {
    expect(countParagraphs("one\ntwo")).toBe(2)
    expect(countParagraphs("one\n\n\ntwo")).toBe(2)
    expect(countParagraphs("single")).toBe(1)
    expect(countParagraphs("  ")).toBe(0)
  })
})
