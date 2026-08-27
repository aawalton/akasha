import { describe, expect, it } from "bun:test"
import type { PropertyDefinition } from "../types"
import {
  calendarDayToPropertyValue,
  isCalendarDraggablePropertyType,
  isCalendarKeyablePropertyType,
  pageDayKey,
} from "./calendar-date-to-value"

const dateProp: PropertyDefinition = { id: "due", title: "Due", type: "calendar-date" }
const instantProp: PropertyDefinition = { id: "at", title: "At", type: "instant" }
const timeProp: PropertyDefinition = { id: "time", title: "Time", type: "calendar-time" }
const selectProp: PropertyDefinition = { id: "status", title: "Status", type: "select" }

describe("isCalendarKeyablePropertyType", () => {
  it("is true for calendar-date and instant", () => {
    expect(isCalendarKeyablePropertyType(dateProp)).toBe(true)
    expect(isCalendarKeyablePropertyType(instantProp)).toBe(true)
  })

  it("is false for non-date types (calendar-time has no date component)", () => {
    expect(isCalendarKeyablePropertyType(timeProp)).toBe(false)
    expect(isCalendarKeyablePropertyType(selectProp)).toBe(false)
  })
})

describe("isCalendarDraggablePropertyType", () => {
  it("is true only for calendar-date (zone-free day-string inverse)", () => {
    expect(isCalendarDraggablePropertyType(dateProp)).toBe(true)
  })

  it("is false for instant (no canonical time-of-day to write back)", () => {
    expect(isCalendarDraggablePropertyType(instantProp)).toBe(false)
    expect(isCalendarDraggablePropertyType(selectProp)).toBe(false)
  })
})

describe("calendarDayToPropertyValue", () => {
  it("maps a day cell key back to the day string for calendar-date", () => {
    expect(calendarDayToPropertyValue(dateProp, "2026-06-25")).toBe("2026-06-25")
  })

  it("returns undefined for non-draggable types (unreachable when gated)", () => {
    expect(calendarDayToPropertyValue(instantProp, "2026-06-25")).toBeUndefined()
    expect(calendarDayToPropertyValue(selectProp, "2026-06-25")).toBeUndefined()
  })
})

describe("pageDayKey", () => {
  it("returns a calendar-date value verbatim", () => {
    expect(pageDayKey(dateProp, "2026-06-20")).toBe("2026-06-20")
  })

  it("returns null for a missing or empty calendar-date value", () => {
    expect(pageDayKey(dateProp, undefined)).toBeNull()
    expect(pageDayKey(dateProp, "")).toBeNull()
  })

  it("buckets an instant by its ESO logical day (mid-day UTC stays on its day)", () => {
    expect(pageDayKey(instantProp, "2026-06-20T16:00:00.000Z")).toBe("2026-06-20")
  })

  it("accepts a legacy epoch-millis instant value", () => {
    const millis = Date.UTC(2026, 5, 20, 16, 0, 0)
    expect(pageDayKey(instantProp, millis)).toBe("2026-06-20")
  })

  it("returns null for an unparseable instant", () => {
    expect(pageDayKey(instantProp, "not-a-date")).toBeNull()
    expect(pageDayKey(instantProp, undefined)).toBeNull()
  })

  it("returns null for a type the calendar cannot key on", () => {
    expect(pageDayKey(timeProp, "12:00")).toBeNull()
    expect(pageDayKey(selectProp, "x")).toBeNull()
  })
})
