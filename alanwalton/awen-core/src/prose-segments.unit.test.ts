import { describe, expect, test } from "bun:test"
import {
  assertProseMarkersWellFormed,
  countProseMarkers,
  MalformedProseMarkerError,
  parseProseIntoRawSegments,
} from "./prose-segments"

describe("prose-segments — the {{system}} marker grammar (#14443)", () => {
  test("prose with no markers is one coalesced prose segment", () => {
    const text = "First paragraph.\n\nSecond paragraph.\n\nThird."
    const segments = parseProseIntoRawSegments(text)
    expect(segments).toEqual([{ kind: "prose", text }])
    expect(countProseMarkers(text)).toBe(0)
  })

  test("a standalone marker splits prose into runs around it", () => {
    const text = "She crossed the threshold.\n\n{{system}}\n\nThe air changed."
    expect(parseProseIntoRawSegments(text)).toEqual([
      { kind: "prose", text: "She crossed the threshold." },
      { kind: "marker" },
      { kind: "prose", text: "The air changed." },
    ])
    expect(countProseMarkers(text)).toBe(1)
  })

  test("consecutive prose blocks coalesce into one run (rendering-identical)", () => {
    const text = "Para one.\n\nPara two.\n\n{{system}}\n\nPara three.\n\nPara four."
    expect(parseProseIntoRawSegments(text)).toEqual([
      { kind: "prose", text: "Para one.\n\nPara two." },
      { kind: "marker" },
      { kind: "prose", text: "Para three.\n\nPara four." },
    ])
  })

  test("multiple markers keep document order and count", () => {
    const text = "A.\n\n{{system}}\n\nB.\n\n{{system}}\n\nC."
    const segments = parseProseIntoRawSegments(text)
    expect(segments.map((s) => s.kind)).toEqual(["prose", "marker", "prose", "marker", "prose"])
    expect(countProseMarkers(text)).toBe(2)
  })

  test("leading and trailing markers are honored", () => {
    const text = "{{system}}\n\nThen the world.\n\n{{system}}"
    expect(parseProseIntoRawSegments(text)).toEqual([
      { kind: "marker" },
      { kind: "prose", text: "Then the world." },
      { kind: "marker" },
    ])
  })

  test("inner whitespace inside the braces is tolerated", () => {
    expect(countProseMarkers("x\n\n{{ system }}\n\ny")).toBe(1)
    expect(countProseMarkers("x\n\n{{system }}\n\ny")).toBe(1)
  })

  describe("malformed markers fail loud (never silent prose)", () => {
    const bad: Record<string, string> = {
      "typo'd keyword": "before\n\n{{sytem}}\n\nafter",
      "unclosed braces": "before\n\n{{system\n\nafter",
      "trailing prose in the block": "before\n\n{{system}} and then it happened\n\nafter",
      "leading prose in the block": "before\n\nsuddenly {{system}}\n\nafter",
      "two markers crammed in one block": "before\n\n{{system}}\n{{system}}\n\nafter",
      "empty braces": "before\n\n{{}}\n\nafter",
      "unknown marker kind": "before\n\n{{narrative}}\n\nafter",
      "stray closing braces": "before\n\nthe cost was }} gold\n\nafter",
    }
    for (const [name, text] of Object.entries(bad)) {
      test(name, () => {
        expect(() => parseProseIntoRawSegments(text)).toThrow(MalformedProseMarkerError)
        expect(() => assertProseMarkersWellFormed(text)).toThrow(MalformedProseMarkerError)
      })
    }
  })

  test("the error names the offending block for the GM", () => {
    try {
      assertProseMarkersWellFormed("ok\n\n{{sytem}}\n\nok")
      throw new Error("expected throw")
    } catch (err) {
      expect(err).toBeInstanceOf(MalformedProseMarkerError)
      if (!(err instanceof MalformedProseMarkerError)) throw err
      expect(err.message).toContain("{{sytem}}")
      expect(err.message).toContain("{{system}}")
    }
  })

  test("assertProseMarkersWellFormed passes clean prose and clean markers", () => {
    expect(assertProseMarkersWellFormed("plain prose only")).toBeUndefined()
    expect(assertProseMarkersWellFormed("a\n\n{{system}}\n\nb")).toBeUndefined()
  })
})
