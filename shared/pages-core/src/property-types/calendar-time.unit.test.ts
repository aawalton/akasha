import { describe, expect, test } from "bun:test"
import type { PropertyDefinition } from "../types"
import { calendarTimeOps } from "./calendar-time"

const def: PropertyDefinition = { id: "t", title: "Due Time", type: "calendar-time" }

describe("calendarTimeOps.validate", () => {
  test("returns null for null/undefined/empty", () => {
    expect(calendarTimeOps.validate(null, def)).toBeNull()
    expect(calendarTimeOps.validate(undefined, def)).toBeNull()
    expect(calendarTimeOps.validate("", def)).toBeNull()
  })

  test("accepts valid HH:MM in 0-23 / 0-59 range", () => {
    expect(calendarTimeOps.validate("00:00", def)).toBeNull()
    expect(calendarTimeOps.validate("09:05", def)).toBeNull()
    expect(calendarTimeOps.validate("14:30", def)).toBeNull()
    expect(calendarTimeOps.validate("23:59", def)).toBeNull()
  })

  test("rejects out-of-range hours and minutes", () => {
    const msg = "Time must be in HH:MM format"
    expect(calendarTimeOps.validate("24:00", def)).toBe(msg)
    expect(calendarTimeOps.validate("99:00", def)).toBe(msg)
    expect(calendarTimeOps.validate("14:60", def)).toBe(msg)
    expect(calendarTimeOps.validate("14:99", def)).toBe(msg)
  })

  test("rejects unpadded or malformed strings", () => {
    const msg = "Time must be in HH:MM format"
    expect(calendarTimeOps.validate("9:05", def)).toBe(msg)
    expect(calendarTimeOps.validate("14:5", def)).toBe(msg)
    expect(calendarTimeOps.validate("14-30", def)).toBe(msg)
    expect(calendarTimeOps.validate("14:30:00", def)).toBe(msg)
    expect(calendarTimeOps.validate("abc", def)).toBe(msg)
    expect(calendarTimeOps.validate(" 14:30 ", def)).toBe(msg)
  })

  test("rejects non-string types", () => {
    const msg = "Time must be a string"
    expect(calendarTimeOps.validate(1430, def)).toBe(msg)
    expect(calendarTimeOps.validate(true, def)).toBe(msg)
    expect(calendarTimeOps.validate([], def)).toBe(msg)
    expect(calendarTimeOps.validate({}, def)).toBe(msg)
  })
})

describe("calendarTimeOps.getSortValue", () => {
  test("returns the string for valid HH:MM", () => {
    expect(calendarTimeOps.getSortValue("14:30", def)).toBe("14:30")
    expect(calendarTimeOps.getSortValue("00:00", def)).toBe("00:00")
  })

  test("returns null for null/undefined/empty/invalid", () => {
    expect(calendarTimeOps.getSortValue(null, def)).toBeNull()
    expect(calendarTimeOps.getSortValue(undefined, def)).toBeNull()
    expect(calendarTimeOps.getSortValue("", def)).toBeNull()
    expect(calendarTimeOps.getSortValue("9:05", def)).toBeNull()
    expect(calendarTimeOps.getSortValue(42, def)).toBeNull()
  })

  test("lex order matches chronological order within a day", () => {
    const a = calendarTimeOps.getSortValue("09:00", def)
    const b = calendarTimeOps.getSortValue("14:30", def)
    if (typeof a !== "string" || typeof b !== "string") {
      throw new Error("expected string sort values")
    }
    expect(a < b).toBe(true)
  })
})

describe("calendarTimeOps.getFilterOperators", () => {
  test("returns plain operator list (no sentinels)", () => {
    expect(calendarTimeOps.getFilterOperators(def)).toEqual([
      { value: "equals", label: "Is" },
      { value: "gt", label: "Is after" },
      { value: "lt", label: "Is before" },
      { value: "gte", label: "Is at or after" },
      { value: "lte", label: "Is at or before" },
      { value: "is_empty", label: "Is empty" },
      { value: "is_not_empty", label: "Is not empty" },
    ])
  })
})

describe("calendarTimeOps.getFilterPredicate", () => {
  test("equals matches exact strings", () => {
    const pred = calendarTimeOps.getFilterPredicate({ operator: "equals", value: "14:30" }, def)
    expect(pred("14:30")).toBe(true)
    expect(pred("14:31")).toBe(false)
  })

  test("gt / lt / gte / lte compare lexicographically", () => {
    const gt = calendarTimeOps.getFilterPredicate({ operator: "gt", value: "09:00" }, def)
    expect(gt("14:30")).toBe(true)
    expect(gt("09:00")).toBe(false)

    const lt = calendarTimeOps.getFilterPredicate({ operator: "lt", value: "14:30" }, def)
    expect(lt("09:00")).toBe(true)
    expect(lt("14:30")).toBe(false)

    const gte = calendarTimeOps.getFilterPredicate({ operator: "gte", value: "09:00" }, def)
    expect(gte("09:00")).toBe(true)
    expect(gte("08:59")).toBe(false)

    const lte = calendarTimeOps.getFilterPredicate({ operator: "lte", value: "14:30" }, def)
    expect(lte("14:30")).toBe(true)
    expect(lte("14:31")).toBe(false)
  })

  test("comparisons return false for non-string operand or filterValue", () => {
    const gt = calendarTimeOps.getFilterPredicate({ operator: "gt", value: "09:00" }, def)
    expect(gt(null)).toBe(false)
    expect(gt(42)).toBe(false)
    const gtNoFilter = calendarTimeOps.getFilterPredicate({ operator: "gt", value: null }, def)
    expect(gtNoFilter("14:30")).toBe(false)
  })

  test("is_empty matches null/undefined/empty", () => {
    const pred = calendarTimeOps.getFilterPredicate({ operator: "is_empty" }, def)
    expect(pred(null)).toBe(true)
    expect(pred(undefined)).toBe(true)
    expect(pred("")).toBe(true)
    expect(pred("14:30")).toBe(false)
  })

  test("is_not_empty matches non-null/non-empty", () => {
    const pred = calendarTimeOps.getFilterPredicate({ operator: "is_not_empty" }, def)
    expect(pred("14:30")).toBe(true)
    expect(pred("")).toBe(false)
    expect(pred(null)).toBe(false)
  })

  test("unknown operator falls open to true", () => {
    const pred = calendarTimeOps.getFilterPredicate({ operator: "contains", value: "14" }, def)
    expect(pred("14:30")).toBe(true)
  })

  test("ordering operators reject malformed HH:MM filterValues (HH:MM:SS, free text)", () => {
    const gtSeconds = calendarTimeOps.getFilterPredicate({ operator: "gt", value: "08:00:00" }, def)
    expect(gtSeconds("09:00")).toBe(false)

    const ltSeconds = calendarTimeOps.getFilterPredicate({ operator: "lt", value: "14:30:00" }, def)
    expect(ltSeconds("09:00")).toBe(false)

    const gteFree = calendarTimeOps.getFilterPredicate({ operator: "gte", value: "abc" }, def)
    expect(gteFree("14:30")).toBe(false)

    const lteOutOfRange = calendarTimeOps.getFilterPredicate(
      { operator: "lte", value: "25:00" },
      def
    )
    expect(lteOutOfRange("14:30")).toBe(false)
  })

  test("ordering operators reject sentinel-shaped object filterValues", () => {
    const sentinel = { sentinel: "now-time" }
    for (const op of ["gt", "lt", "gte", "lte"] as const) {
      const pred = calendarTimeOps.getFilterPredicate({ operator: op, value: sentinel }, def)
      expect(pred("14:30")).toBe(false)
      expect(pred("00:00")).toBe(false)
    }
  })

  test("equals returns false for sentinel-shaped object filterValue against any HH:MM", () => {
    const sentinel = { sentinel: "now-time" }
    const pred = calendarTimeOps.getFilterPredicate({ operator: "equals", value: sentinel }, def)
    expect(pred("14:30")).toBe(false)
    expect(pred("00:00")).toBe(false)
    expect(pred(null)).toBe(false)
  })
})
