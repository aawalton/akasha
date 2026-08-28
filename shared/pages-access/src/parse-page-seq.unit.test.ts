import { describe, expect, it, spyOn } from "bun:test"
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
