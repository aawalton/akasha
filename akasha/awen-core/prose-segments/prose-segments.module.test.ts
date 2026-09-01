import { describe, expect, test } from "bun:test"
import {
  assertProseMarkersWellFormed,
  countProseMarkers,
  MalformedProseMarkerError,
  parseProseIntoRawSegments,
} from "./prose-segments.module.code.ts"

describe("parseProseIntoRawSegments", () => {
  test("plain prose is one run", () => {
    expect(parseProseIntoRawSegments("a line")).toEqual([{ kind: "prose", text: "a line" }])
  })

  test("neighbouring blocks are gathered into one run", () => {
    expect(parseProseIntoRawSegments("one\n\ntwo")).toEqual([{ kind: "prose", text: "one\n\ntwo" }])
  })

  test("a marker alone in its block splits the runs", () => {
    expect(parseProseIntoRawSegments("one\n\n{{system}}\n\ntwo")).toEqual([
      { kind: "prose", text: "one" },
      { kind: "marker" },
      { kind: "prose", text: "two" },
    ])
  })

  test("a marker may open and close the text", () => {
    expect(parseProseIntoRawSegments("{{system}}\n\none\n\n{{system}}")).toEqual([
      { kind: "marker" },
      { kind: "prose", text: "one" },
      { kind: "marker" },
    ])
  })

  test("whitespace inside the braces is allowed", () => {
    expect(parseProseIntoRawSegments("{{ system }}")).toEqual([{ kind: "marker" }])
  })

  test("empty text holds no segments", () => {
    expect(parseProseIntoRawSegments("\n\n  \n\n")).toEqual([])
  })

  test("a block reaching for a marker without being one is refused", () => {
    expect(() => parseProseIntoRawSegments("one {{system}} two")).toThrow(MalformedProseMarkerError)
    expect(() => parseProseIntoRawSegments("{{sistem}}")).toThrow(MalformedProseMarkerError)
  })
})

describe("countProseMarkers", () => {
  test("counts the markers", () => {
    expect(countProseMarkers("a\n\n{{system}}\n\nb\n\n{{system}}\n\nc")).toBe(2)
    expect(countProseMarkers("a")).toBe(0)
  })
})

describe("assertProseMarkersWellFormed", () => {
  test("says nothing about well-formed prose", () => {
    expect(assertProseMarkersWellFormed("a\n\n{{system}}\n\nb")).toBe(undefined)
  })

  test("throws on a malformed marker", () => {
    expect(() => assertProseMarkersWellFormed("a {{system}}")).toThrow(MalformedProseMarkerError)
  })
})
