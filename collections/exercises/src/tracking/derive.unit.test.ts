import { describe, expect, test } from "bun:test"
import {
  capitalizeDayOfWeek,
  dayOfWeekFromDayStr,
  dayOfWeekFromUtcDay,
  isDayOfWeek,
} from "./day-of-week"
import { nextSetNumber } from "./derive"

describe("nextSetNumber", () => {
  test("starts at 1 when the exercise has no sets in the session", () => {
    expect(nextSetNumber([])).toBe(1)
  })
  test("increments past the max existing set number", () => {
    expect(nextSetNumber([1, 2, 3])).toBe(4)
  })
  test("gaps do not reuse numbers", () => {
    expect(nextSetNumber([1, 4])).toBe(5)
  })
})

describe("dayOfWeekFromUtcDay", () => {
  test("maps getUTCDay numbering (0 = Sunday)", () => {
    expect(dayOfWeekFromUtcDay(0)).toBe("sunday")
    expect(dayOfWeekFromUtcDay(5)).toBe("friday")
    expect(dayOfWeekFromUtcDay(6)).toBe("saturday")
  })
  test("throws out of range", () => {
    expect(() => dayOfWeekFromUtcDay(7)).toThrow("out of range")
  })
})

describe("isDayOfWeek / capitalizeDayOfWeek", () => {
  test("accepts the seven literals and rejects others", () => {
    expect(isDayOfWeek("wednesday")).toBe(true)
    expect(isDayOfWeek("Wednesday")).toBe(false)
    expect(isDayOfWeek("today")).toBe(false)
  })
  test("capitalizes for titles", () => {
    expect(capitalizeDayOfWeek("friday")).toBe("Friday")
  })
})

describe("dayOfWeekFromDayStr", () => {
  test("2026-06-12 is a Friday", () => {
    expect(dayOfWeekFromDayStr("2026-06-12")).toBe("friday")
  })
  test("DST spring-forward day 2026-03-08 is a Sunday", () => {
    expect(dayOfWeekFromDayStr("2026-03-08")).toBe("sunday")
  })
  test("DST fall-back day 2026-11-01 is a Sunday", () => {
    expect(dayOfWeekFromDayStr("2026-11-01")).toBe("sunday")
  })
  test("throws on a malformed day string", () => {
    expect(() => dayOfWeekFromDayStr("06/12/2026")).toThrow("YYYY-MM-DD")
  })
})
