import { describe, expect, test } from "bun:test"
import {
  DAYS_OF_WEEK_MONDAY_FIRST,
  dayOfWeekFromDayStr,
  dayOfWeekFromUtcDay,
  isDayOfWeek,
} from "./day-of-week.module.code.ts"

describe("the seven days counted from Monday", () => {
  test("runs Monday to Sunday", () => {
    expect(DAYS_OF_WEEK_MONDAY_FIRST).toEqual([
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ])
  })
})

describe("a day of the week told from anything else", () => {
  test("admits each of the seven", () => {
    for (const day of DAYS_OF_WEEK_MONDAY_FIRST) expect(isDayOfWeek(day)).toBe(true)
  })

  test("refuses a capitalised day, an abbreviation and empty text", () => {
    expect(isDayOfWeek("Monday")).toBe(false)
    expect(isDayOfWeek("mon")).toBe(false)
    expect(isDayOfWeek("")).toBe(false)
  })
})

describe("a day of the week read off a UTC day number", () => {
  test("counts from Sunday at zero", () => {
    expect(dayOfWeekFromUtcDay(0)).toBe("sunday")
    expect(dayOfWeekFromUtcDay(6)).toBe("saturday")
  })

  test("refuses a number outside nought to six", () => {
    expect(() => dayOfWeekFromUtcDay(7)).toThrow("index out of range")
    expect(() => dayOfWeekFromUtcDay(-1)).toThrow("index out of range")
  })
})

describe("a day of the week read off a dashed date", () => {
  test("answers the day the calendar gives", () => {
    expect(dayOfWeekFromDayStr("2026-09-03")).toBe("thursday")
    expect(dayOfWeekFromDayStr("2026-01-01")).toBe("thursday")
    expect(dayOfWeekFromDayStr("2024-02-29")).toBe("thursday")
  })

  test("reads the day in UTC rather than in the zone the process runs in", () => {
    expect(dayOfWeekFromDayStr("2026-09-06")).toBe("sunday")
    expect(dayOfWeekFromDayStr("2026-09-07")).toBe("monday")
  })

  test("agrees with the seven days over a whole week", () => {
    const week = [
      "2026-09-06",
      "2026-09-07",
      "2026-09-08",
      "2026-09-09",
      "2026-09-10",
      "2026-09-11",
      "2026-09-12",
    ]
    expect(week.map(dayOfWeekFromDayStr)).toEqual([
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ])
  })

  test("refuses a date spelled any other way", () => {
    expect(() => dayOfWeekFromDayStr("2026-9-3")).toThrow()
    expect(() => dayOfWeekFromDayStr("2026/09/03")).toThrow()
    expect(() => dayOfWeekFromDayStr("2026-09-03T00:00:00Z")).toThrow()
    expect(() => dayOfWeekFromDayStr("")).toThrow()
  })
})
