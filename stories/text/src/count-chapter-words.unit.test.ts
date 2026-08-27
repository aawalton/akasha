import { describe, expect, test } from "bun:test"
import { countChapterWords, SPEAKER_MARKER_RE, stripLeadingSpeakerMarker } from "./index"

describe("countChapterWords", () => {
  test("plain prose counts whitespace-delimited tokens", () => {
    expect(countChapterWords("Hello world")).toBe(2)
    expect(countChapterWords("one two three four five")).toBe(5)
  })

  test("empty / whitespace-only text counts 0", () => {
    expect(countChapterWords("")).toBe(0)
    expect(countChapterWords("   ")).toBe(0)
    expect(countChapterWords("\n\n  \n")).toBe(0)
  })

  test("empty tokens are dropped (leading/trailing/interior whitespace)", () => {
    expect(countChapterWords("  Hello   world  ")).toBe(2)
    expect(countChapterWords("a\n\n\nb")).toBe(2)
  })

  test("strips a leading [slug] speaker marker before counting", () => {
    expect(countChapterWords("[ione] Hello world")).toBe(2)
    expect(countChapterWords("[zadi]   two words")).toBe(2)
  })

  test("strips the marker on each paragraph independently", () => {
    const text = "[ione] first paragraph here\n\n[zadi] second one\n\nunmarked third"
    expect(countChapterWords(text)).toBe(7)
  })

  test("a mid-paragraph bracket is literal text, not a marker", () => {
    expect(countChapterWords("the word recieve [sic] appears")).toBe(5)
  })

  test("numeric/markdown brackets are not markers (slug must start with a letter)", () => {
    expect(countChapterWords("[1] footnote body")).toBe(3)
  })

  test("marker with no following prose counts 0", () => {
    expect(countChapterWords("[ione]")).toBe(0)
  })
})

describe("stripLeadingSpeakerMarker", () => {
  test("removes the leading marker, returns the body", () => {
    expect(stripLeadingSpeakerMarker("[ione] hello")).toBe("hello")
    expect(stripLeadingSpeakerMarker("  [zadi]  hello")).toBe("hello")
  })

  test("returns the paragraph unchanged when there is no marker", () => {
    expect(stripLeadingSpeakerMarker("plain paragraph")).toBe("plain paragraph")
    expect(stripLeadingSpeakerMarker("mid [sic] bracket")).toBe("mid [sic] bracket")
  })
})

describe("SPEAKER_MARKER_RE", () => {
  test("matches a paragraph-leading lowercase-kebab slug", () => {
    expect(SPEAKER_MARKER_RE.test("[ione] x")).toBe(true)
    expect(SPEAKER_MARKER_RE.test("[awen-gm] x")).toBe(true)
  })

  test("does not match numeric brackets or mid-paragraph brackets", () => {
    expect(SPEAKER_MARKER_RE.test("[1] x")).toBe(false)
    expect(SPEAKER_MARKER_RE.test("word [ione] x")).toBe(false)
  })
})
