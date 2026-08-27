import { describe, expect, it, spyOn } from "bun:test"
import { comparePageSeq } from "../../../page/page-seq.ts"
import { parsePageSeq } from "./parse-page-seq"

describe("parsePageSeq", () => {
  it("parses a numeric-string seq (the production node-pg bigint shape)", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(parsePageSeq("14850", "pipeline-abc")).toBe(14850)
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })

  it("passes a numeric seq through unchanged (the pglite test-path shape)", () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(parsePageSeq(14850, "pipeline-abc")).toBe(14850)
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })

  it.each([
    ["undefined", undefined],
    ["null", null],
    ["an empty string", ""],
  ])("reads %s as an absent seq, quietly, never as 0", (_label, raw) => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(parsePageSeq(raw, "page-xyz")).toBeNull()
      expect(warn).not.toHaveBeenCalled()
    } finally {
      warn.mockRestore()
    }
  })

  it.each([
    ["a non-numeric string", "abc"],
    ["a decimal string", "1.5"],
    ["an exponent string", "1e3"],
    ["a whitespace-padded string", " 12"],
    ["a negative string", "-1"],
    ["an object", { seq: 1 }],
    ["NaN", Number.NaN],
  ])("reads %s as absent LOUDLY, naming the context, never as 0", (_label, raw) => {
    const warn = spyOn(console, "warn").mockImplementation(() => {})
    try {
      expect(parsePageSeq(raw, "page-xyz")).toBeNull()
      expect(warn).toHaveBeenCalledTimes(1)
      expect(String(warn.mock.calls[0]?.[0] ?? "")).toContain("page-xyz")
    } finally {
      warn.mockRestore()
    }
  })
})

describe("comparePageSeq", () => {
  it("orders two seqs the page type minted, lowest first", () => {
    expect(comparePageSeq(1, 2)).toBeLessThan(0)
    expect(comparePageSeq(2, 1)).toBeGreaterThan(0)
    expect(comparePageSeq(7, 7)).toBe(0)
  })

  it.each([
    ["null", null],
    ["undefined", undefined],
  ])("sorts a page carrying no seq (%s) after every page that has one", (_label, absent) => {
    expect(comparePageSeq(absent, 1)).toBeGreaterThan(0)
    expect(comparePageSeq(1, absent)).toBeLessThan(0)
    expect(comparePageSeq(absent, absent)).toBe(0)
  })

  it("never folds an absent seq to 0, which would sort it before every minted seq", () => {
    expect(comparePageSeq(null, 0)).toBeGreaterThan(0)
    expect(comparePageSeq(null, -1)).toBeGreaterThan(0)
  })

  it("leaves every seqless page last however the input was ordered", () => {
    const sorted = [null, 3, undefined, 1, 2].sort(comparePageSeq)
    expect(sorted.slice(0, 3)).toEqual([1, 2, 3])
    expect(sorted.slice(3).every((one) => one === null || one === undefined)).toBe(true)
  })
})
