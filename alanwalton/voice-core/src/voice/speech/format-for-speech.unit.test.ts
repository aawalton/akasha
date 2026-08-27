import { describe, expect, test } from "bun:test"
import { formatForSpeech } from "../speech"

describe("formatForSpeech", () => {
  test("plain text passes through trimmed as one segment", () => {
    expect(formatForSpeech("  Done — milk is on the list.  ")).toEqual([
      "Done — milk is on the list.",
    ])
  })

  test("collapses newlines and runs of whitespace to single spaces", () => {
    expect(formatForSpeech("line one\n\nline two\t three")).toEqual(["line one line two three"])
  })

  test("strips heading markers", () => {
    expect(formatForSpeech("# Status\nAll green")).toEqual(["Status All green"])
  })

  test("strips bullet markers", () => {
    expect(formatForSpeech("- first\n- second\n* third")).toEqual(["first second third"])
  })

  test("strips bold and italic markers", () => {
    expect(formatForSpeech("**done** and _verified_")).toEqual(["done and verified"])
  })

  test("strips inline code backticks, keeps the content", () => {
    expect(formatForSpeech("run `git status` now")).toEqual(["run git status now"])
  })

  test("replaces fenced code blocks with a placeholder", () => {
    expect(formatForSpeech("see below\n```ts\nconst x = 1\n```\ndone")).toEqual([
      "see below (code omitted) done",
    ])
  })

  test("links become their text", () => {
    expect(formatForSpeech("read [the docs](https://example.com) first")).toEqual([
      "read the docs first",
    ])
  })

  test("empty input yields no segments", () => {
    expect(formatForSpeech("   \n  ")).toEqual([])
  })
})
