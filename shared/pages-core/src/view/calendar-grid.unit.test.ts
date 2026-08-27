import { describe, expect, it } from "bun:test"
import {
  addCalendarDays,
  buildMonthGrid,
  CALENDAR_WEEKDAY_LABELS,
  getWeekStart,
  monthKeyOf,
  shiftMonth,
  weekdayIndex,
} from "./calendar-grid"

describe("addCalendarDays", () => {
  it("adds and subtracts days across month boundaries", () => {
    expect(addCalendarDays("2026-06-20", 1)).toBe("2026-06-21")
    expect(addCalendarDays("2026-06-30", 1)).toBe("2026-07-01")
    expect(addCalendarDays("2026-07-01", -1)).toBe("2026-06-30")
  })

  it("crosses a year boundary", () => {
    expect(addCalendarDays("2026-12-31", 1)).toBe("2027-01-01")
    expect(addCalendarDays("2027-01-01", -1)).toBe("2026-12-31")
  })

  it("handles a leap-day February correctly", () => {
    expect(addCalendarDays("2028-02-28", 1)).toBe("2028-02-29")
    expect(addCalendarDays("2028-02-29", 1)).toBe("2028-03-01")
  })

  it("returns a malformed input unchanged", () => {
    expect(addCalendarDays("nope", 1)).toBe("nope")
  })
})

describe("weekdayIndex", () => {
  it("returns 0 for Sunday through 6 for Saturday", () => {
    expect(weekdayIndex("2026-06-21")).toBe(0)
    expect(weekdayIndex("2026-06-22")).toBe(1)
    expect(weekdayIndex("2026-06-27")).toBe(6)
  })

  it("returns -1 for a malformed input", () => {
    expect(weekdayIndex("bad")).toBe(-1)
  })
})

describe("monthKeyOf", () => {
  it("extracts the YYYY-MM month key", () => {
    expect(monthKeyOf("2026-06-20")).toBe("2026-06")
  })
})

describe("getWeekStart", () => {
  it("maps a Monday to itself", () => {
    expect(getWeekStart("2026-06-08")).toBe("2026-06-08")
  })

  it("maps a mid-week day back to its Monday", () => {
    expect(getWeekStart("2026-06-10")).toBe("2026-06-08")
  })

  it("maps a Sunday back to the preceding Monday", () => {
    expect(getWeekStart("2026-06-14")).toBe("2026-06-08")
    expect(getWeekStart("2026-06-21")).toBe("2026-06-15")
  })

  it("crosses a month boundary", () => {
    expect(getWeekStart("2026-07-01")).toBe("2026-06-29")
  })

  it("returns a malformed input unchanged", () => {
    expect(getWeekStart("bad")).toBe("bad")
  })
})

describe("shiftMonth", () => {
  it("returns the first of the month N months away", () => {
    expect(shiftMonth("2026-06-20", 1)).toBe("2026-07-01")
    expect(shiftMonth("2026-06-20", -1)).toBe("2026-05-01")
  })

  it("wraps across year boundaries", () => {
    expect(shiftMonth("2026-12-15", 1)).toBe("2027-01-01")
    expect(shiftMonth("2026-01-15", -1)).toBe("2025-12-01")
  })

  it("clamps to the 1st so month arithmetic never overflows", () => {
    expect(shiftMonth("2026-01-31", 1)).toBe("2026-02-01")
  })
})

describe("buildMonthGrid", () => {
  const grid = buildMonthGrid("2026-06-15")

  it("returns the focused month key and label", () => {
    expect(grid.monthKey).toBe("2026-06")
    expect(grid.label).toBe("June 2026")
  })

  it("produces 6 weeks of 7 Monday-first days", () => {
    expect(grid.weeks).toHaveLength(6)
    for (const week of grid.weeks) {
      expect(week).toHaveLength(7)
      expect(weekdayIndex(week[0] ?? "")).toBe(1)
      expect(weekdayIndex(week[6] ?? "")).toBe(0)
    }
  })

  it("starts on the Monday on/before the 1st and is contiguous", () => {
    expect(grid.weeks[0]?.[0]).toBe("2026-06-01")
    const flat = grid.weeks.flat()
    for (let i = 1; i < flat.length; i++) {
      expect(flat[i]).toBe(addCalendarDays(flat[i - 1] ?? "", 1))
    }
  })

  it("contains every day of the focused month", () => {
    const flat = new Set(grid.weeks.flat())
    expect(flat.has("2026-06-01")).toBe(true)
    expect(flat.has("2026-06-30")).toBe(true)
  })

  it("exposes Monday-first weekday labels", () => {
    expect(CALENDAR_WEEKDAY_LABELS[0]).toBe("Mon")
    expect(CALENDAR_WEEKDAY_LABELS[6]).toBe("Sun")
    expect(CALENDAR_WEEKDAY_LABELS).toHaveLength(7)
  })
})
