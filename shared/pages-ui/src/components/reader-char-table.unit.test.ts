import { describe, expect, it } from "bun:test"
import {
  blockPositionForFraction,
  buildProseCharTable,
  fractionForBlockPosition,
} from "./reader-char-table"

describe("buildProseCharTable", () => {
  it("weighs an empty block list as zero total", () => {
    const table = buildProseCharTable([])
    expect(table.totalChars).toBe(0)
    expect(table.charStarts).toEqual([])
    expect(table.chars).toEqual([])
  })

  it("accumulates cumulative char offsets across blocks", () => {
    const table = buildProseCharTable(["aaaaa", "bbb", "ccccccc"])
    expect(table.chars).toEqual([5, 3, 7])
    expect(table.charStarts).toEqual([0, 5, 8])
    expect(table.totalChars).toBe(15)
  })
})

describe("fractionForBlockPosition", () => {
  const table = buildProseCharTable(["aaaaa", "bbb", "ccccccc"])

  it("maps the start of block 0 to 0", () => {
    expect(fractionForBlockPosition(table, 0, 0)).toBe(0)
  })

  it("maps a mid-block position to its char fraction", () => {
    expect(fractionForBlockPosition(table, 1, 0.5)).toBeCloseTo(6.5 / 15, 10)
  })

  it("maps the end of the last block to 1", () => {
    expect(fractionForBlockPosition(table, 2, 1)).toBe(1)
  })

  it("clamps an out-of-range block index and intra fraction", () => {
    expect(fractionForBlockPosition(table, 99, 5)).toBe(1)
    expect(fractionForBlockPosition(table, -3, -1)).toBe(0)
  })

  it("returns 0 for an empty table", () => {
    expect(fractionForBlockPosition(buildProseCharTable([]), 0, 0.5)).toBe(0)
  })
})

describe("blockPositionForFraction", () => {
  const table = buildProseCharTable(["aaaaa", "bbb", "ccccccc"])

  it("resolves fraction 0 to the start of block 0", () => {
    expect(blockPositionForFraction(table, 0)).toEqual({ blockIndex: 0, intraFraction: 0 })
  })

  it("resolves fraction >= 1 to the end of the last block", () => {
    expect(blockPositionForFraction(table, 1)).toEqual({ blockIndex: 2, intraFraction: 1 })
    expect(blockPositionForFraction(table, 5)).toEqual({ blockIndex: 2, intraFraction: 1 })
  })

  it("binary-searches the block containing the target char", () => {
    const { blockIndex, intraFraction } = blockPositionForFraction(table, 6 / 15)
    expect(blockIndex).toBe(1)
    expect(intraFraction).toBeCloseTo(1 / 3, 10)
  })

  it("lands on a block boundary at the boundary's own start", () => {
    const { blockIndex, intraFraction } = blockPositionForFraction(table, 8 / 15)
    expect(blockIndex).toBe(2)
    expect(intraFraction).toBeCloseTo(0, 10)
  })

  it("resolves fraction 0 to block 0 on an empty table", () => {
    expect(blockPositionForFraction(buildProseCharTable([]), 0.4)).toEqual({
      blockIndex: 0,
      intraFraction: 0,
    })
  })
})

describe("roundtrip fractionForBlockPosition ∘ blockPositionForFraction ≈ identity", () => {
  const table = buildProseCharTable([
    "The quick brown fox.",
    "Jumps over the lazy dog and keeps going for a while.",
    "Short.",
    "A final closing paragraph of some middling length here.",
  ])

  for (const f of [0, 0.13, 0.25, 0.5, 0.66, 0.9, 0.999, 1]) {
    it(`roundtrips fraction ${f}`, () => {
      const { blockIndex, intraFraction } = blockPositionForFraction(table, f)
      const back = fractionForBlockPosition(table, blockIndex, intraFraction)
      expect(back).toBeCloseTo(f, 10)
    })
  }
})
