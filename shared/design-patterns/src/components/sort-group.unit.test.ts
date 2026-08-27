import { describe, expect, it } from "bun:test"
import { applySortDrop, computeSortDropZone, type SortRowMeasure } from "./sort-group-helpers"

const ROWS: readonly SortRowMeasure[] = [
  { id: "a", top: 0, height: 20 },
  { id: "b", top: 20, height: 20 },
  { id: "c", top: 40, height: 20 },
]

describe("computeSortDropZone", () => {
  it("returns null when no candidate rows remain (only the active row)", () => {
    expect(computeSortDropZone([{ id: "a", top: 0, height: 20 }], 10, "a")).toBeNull()
  })

  it("returns null for an empty row set", () => {
    expect(computeSortDropZone([], 10, "a")).toBeNull()
  })

  it("excludes the active row from candidates", () => {
    const zone = computeSortDropZone(ROWS, 30, "b")
    expect(zone?.rowId).not.toBe("b")
  })

  it("picks the top half of a row as a 'before' edge", () => {
    expect(computeSortDropZone(ROWS, 22, "a")).toEqual({ rowId: "b", position: "before" })
  })

  it("picks the bottom half of a row as an 'after' edge", () => {
    expect(computeSortDropZone(ROWS, 38, "a")).toEqual({ rowId: "b", position: "after" })
  })

  it("clamps a pointer above the first row to the first candidate's 'before' edge", () => {
    expect(computeSortDropZone(ROWS, -50, "c")).toEqual({ rowId: "a", position: "before" })
  })

  it("clamps a pointer below the last row to the last candidate's 'after' edge", () => {
    expect(computeSortDropZone(ROWS, 999, "a")).toEqual({ rowId: "c", position: "after" })
  })
})

describe("applySortDrop", () => {
  const ORDER = ["a", "b", "c", "d"] as const

  it("moves a row before the anchor", () => {
    expect(applySortDrop(ORDER, "d", { rowId: "b", position: "before" })).toEqual([
      "a",
      "d",
      "b",
      "c",
    ])
  })

  it("moves a row after the anchor", () => {
    expect(applySortDrop(ORDER, "a", { rowId: "c", position: "after" })).toEqual([
      "b",
      "c",
      "a",
      "d",
    ])
  })

  it("is a no-op move when dropped before its own next neighbour", () => {
    expect(applySortDrop(ORDER, "a", { rowId: "b", position: "before" })).toEqual([
      "a",
      "b",
      "c",
      "d",
    ])
  })

  it("returns the original order unchanged when the anchor is missing", () => {
    expect(applySortDrop(ORDER, "a", { rowId: "zzz", position: "before" })).toEqual([
      "a",
      "b",
      "c",
      "d",
    ])
  })

  it("returns the original order unchanged when the anchor is the active row", () => {
    expect(applySortDrop(ORDER, "b", { rowId: "b", position: "after" })).toEqual([
      "a",
      "b",
      "c",
      "d",
    ])
  })
})
