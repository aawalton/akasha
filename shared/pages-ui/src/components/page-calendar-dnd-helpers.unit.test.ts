import { describe, expect, it } from "bun:test"
import { type CalendarCellRect, computeCalendarDropDay } from "./page-calendar-dnd-helpers"

const CELLS: readonly CalendarCellRect[] = [
  { day: "2026-06-01", left: 0, top: 0, width: 100, height: 100 },
  { day: "2026-06-02", left: 100, top: 0, width: 100, height: 100 },
  { day: "2026-06-03", left: 0, top: 100, width: 100, height: 100 },
  { day: "2026-06-04", left: 100, top: 100, width: 100, height: 100 },
]

describe("computeCalendarDropDay", () => {
  it("returns null for an empty cell set", () => {
    expect(computeCalendarDropDay([], 50, 50)).toBeNull()
  })

  it("resolves the cell the pointer is inside", () => {
    expect(computeCalendarDropDay(CELLS, 50, 50)).toBe("2026-06-01")
    expect(computeCalendarDropDay(CELLS, 150, 50)).toBe("2026-06-02")
    expect(computeCalendarDropDay(CELLS, 50, 150)).toBe("2026-06-03")
    expect(computeCalendarDropDay(CELLS, 150, 150)).toBe("2026-06-04")
  })

  it("returns null for a pointer outside every cell (no clamping)", () => {
    expect(computeCalendarDropDay(CELLS, -40, 50)).toBeNull()
    expect(computeCalendarDropDay(CELLS, 50, 9999)).toBeNull()
    expect(computeCalendarDropDay(CELLS, 9999, 9999)).toBeNull()
  })

  it("resolves the boundary pointer to the cell whose span contains it", () => {
    expect(computeCalendarDropDay(CELLS, 100, 100)).toBe("2026-06-04")
    expect(computeCalendarDropDay(CELLS, 100, 50)).toBe("2026-06-02")
    expect(computeCalendarDropDay(CELLS, 99, 99)).toBe("2026-06-01")
  })
})
