import { describe, expect, it } from "bun:test"
import {
  applyColumnDrop,
  type ColumnRectMeasure,
  computeColumnDropZone,
  reorderVisibleProperties,
} from "./page-table-column-dnd-helpers"

const COLUMNS: readonly ColumnRectMeasure[] = [
  { id: "a", left: 0, width: 20 },
  { id: "b", left: 20, width: 20 },
  { id: "c", left: 40, width: 20 },
]

describe("computeColumnDropZone", () => {
  it("returns null when no candidate columns remain (only the active column)", () => {
    expect(computeColumnDropZone([{ id: "a", left: 0, width: 20 }], 10, "a")).toBeNull()
  })

  it("returns null for an empty column set", () => {
    expect(computeColumnDropZone([], 10, "a")).toBeNull()
  })

  it("excludes the active column from candidates", () => {
    const zone = computeColumnDropZone(COLUMNS, 30, "b")
    expect(zone?.columnId).not.toBe("b")
  })

  it("picks the left half of a column as a 'before' edge", () => {
    expect(computeColumnDropZone(COLUMNS, 22, "a")).toEqual({ columnId: "b", position: "before" })
  })

  it("picks the right half of a column as an 'after' edge", () => {
    expect(computeColumnDropZone(COLUMNS, 38, "a")).toEqual({ columnId: "b", position: "after" })
  })

  it("clamps a pointer left of the first column to the first candidate's 'before' edge", () => {
    expect(computeColumnDropZone(COLUMNS, -50, "c")).toEqual({ columnId: "a", position: "before" })
  })

  it("clamps a pointer right of the last column to the last candidate's 'after' edge", () => {
    expect(computeColumnDropZone(COLUMNS, 999, "a")).toEqual({ columnId: "c", position: "after" })
  })
})

describe("applyColumnDrop", () => {
  const ORDER = ["a", "b", "c", "d"] as const

  it("moves a column before the anchor", () => {
    expect(applyColumnDrop(ORDER, "d", { columnId: "b", position: "before" })).toEqual([
      "a",
      "d",
      "b",
      "c",
    ])
  })

  it("moves a column after the anchor", () => {
    expect(applyColumnDrop(ORDER, "a", { columnId: "c", position: "after" })).toEqual([
      "b",
      "c",
      "a",
      "d",
    ])
  })

  it("is a no-op when active and anchor are the same column", () => {
    expect(applyColumnDrop(ORDER, "b", { columnId: "b", position: "before" })).toEqual([
      "a",
      "b",
      "c",
      "d",
    ])
  })

  it("returns the order unchanged when the anchor is absent", () => {
    expect(applyColumnDrop(ORDER, "a", { columnId: "z", position: "after" })).toEqual([
      "a",
      "b",
      "c",
      "d",
    ])
  })

  it("never leaves a duplicate on an intra-list move", () => {
    const result = applyColumnDrop(ORDER, "a", { columnId: "c", position: "after" })
    expect(new Set(result).size).toBe(result.length)
  })
})

describe("reorderVisibleProperties", () => {
  it("returns the new column order when every visible id is a column", () => {
    expect(reorderVisibleProperties(["a", "b", "c"], ["c", "a", "b"])).toEqual(["c", "a", "b"])
  })

  it("appends non-column visible ids in original relative order", () => {
    expect(reorderVisibleProperties(["a", "x", "b", "y"], ["b", "a"])).toEqual(["b", "a", "x", "y"])
  })

  it("never drops a visible id that is not a column", () => {
    const result = reorderVisibleProperties(["a", "stale"], ["a"])
    expect(result).toContain("stale")
  })

  it("returns just the columns when current visible is empty", () => {
    expect(reorderVisibleProperties([], ["a", "b"])).toEqual(["a", "b"])
  })
})
