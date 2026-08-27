import { describe, expect, test } from "bun:test"
import { parseInlineTokens } from "./parse-inline-tokens"

describe("parseInlineTokens", () => {
  test("single sigil @: parses one token and strips it", () => {
    expect(parseInlineTokens("hello @foo bar", ["@"])).toEqual({
      cleanTitle: "hello bar",
      parsedBySigil: { "@": ["foo"] },
    })
  })

  test("multiple sigils: each token routed to its sigil", () => {
    expect(parseInlineTokens("@a hello #b", ["@", "#"])).toEqual({
      cleanTitle: "hello",
      parsedBySigil: { "@": ["a"], "#": ["b"] },
    })
  })

  test("dedup repeated tokens within one sigil", () => {
    expect(parseInlineTokens("@foo @foo", ["@"])).toEqual({
      cleanTitle: "",
      parsedBySigil: { "@": ["foo"] },
    })
  })

  test("lowercases captured tokens", () => {
    expect(parseInlineTokens("@FOO", ["@"])).toEqual({
      cleanTitle: "",
      parsedBySigil: { "@": ["foo"] },
    })
  })

  test("collapses internal whitespace left after stripping tokens", () => {
    expect(parseInlineTokens("a  @x  b", ["@"])).toEqual({
      cleanTitle: "a b",
      parsedBySigil: { "@": ["x"] },
    })
  })

  test("empty sigils array returns whitespace-collapsed input as cleanTitle", () => {
    expect(parseInlineTokens("a @b c", [])).toEqual({
      cleanTitle: "a @b c",
      parsedBySigil: {},
    })
  })

  test("no matches: cleanTitle preserved, sigil entry empty", () => {
    expect(parseInlineTokens("hello", ["@"])).toEqual({
      cleanTitle: "hello",
      parsedBySigil: { "@": [] },
    })
  })
})
