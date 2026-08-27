import { describe, expect, it } from "bun:test"
import { type BoardColumnRect, computeBoardDropColumn } from "./page-board-dnd-helpers"

const COLUMNS: readonly BoardColumnRect[] = [
  { key: "todo", left: 0, width: 100 },
  { key: "doing", left: 100, width: 100 },
  { key: "done", left: 200, width: 100 },
]

describe("computeBoardDropColumn", () => {
  it("returns null for an empty column set", () => {
    expect(computeBoardDropColumn([], 50)).toBeNull()
  })

  it("resolves the column the pointer is inside", () => {
    expect(computeBoardDropColumn(COLUMNS, 50)).toBe("todo")
    expect(computeBoardDropColumn(COLUMNS, 150)).toBe("doing")
    expect(computeBoardDropColumn(COLUMNS, 250)).toBe("done")
  })

  it("clamps a pointer left of the first column to the first column", () => {
    expect(computeBoardDropColumn(COLUMNS, -40)).toBe("todo")
  })

  it("clamps a pointer right of the last column to the last column", () => {
    expect(computeBoardDropColumn(COLUMNS, 9999)).toBe("done")
  })

  it("resolves the boundary pointer to the column whose span contains it", () => {
    expect(computeBoardDropColumn(COLUMNS, 100)).toBe("doing")
  })
})
