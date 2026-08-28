import { describe, expect, it } from "bun:test"
import { comparePageSeq } from "./page-seq.ts"

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
