import { describe, expect, test } from "bun:test"
import {
  getMountainEveningDayStr,
  mtWallHm,
  mtWallToInstant,
} from "akasha/alan/track/daily/mountain-times/mountain-times.module.code.ts"

const SPRING_2026 = "2026-03-08T09:00:00Z"

const FALL_2026 = "2026-11-01T08:00:00Z"

describe("which offset Mountain stands at", () => {
  test("winter is seven behind and summer is six", () => {
    expect(mtWallHm(new Date("2026-01-15T12:00:00Z"))).toBe("05:00")
    expect(mtWallHm(new Date("2026-07-15T12:00:00Z"))).toBe("06:00")
  })

  test("spring forward is at 09:00 UTC, and 01:59 is followed by 03:00", () => {
    expect(mtWallHm(new Date("2026-03-08T08:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date(SPRING_2026))).toBe("03:00")
  })

  test("fall back is at 08:00 UTC, and 01:59 is followed by 01:00 again", () => {
    expect(mtWallHm(new Date("2026-11-01T07:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date(FALL_2026))).toBe("01:00")
  })

  test("the same rule holds in another year, so it is a rule and not a table", () => {
    expect(mtWallHm(new Date("2025-03-09T08:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date("2025-03-09T09:00:00Z"))).toBe("03:00")
    expect(mtWallHm(new Date("2025-11-02T07:59:00Z"))).toBe("01:59")
    expect(mtWallHm(new Date("2025-11-02T08:00:00Z"))).toBe("01:00")
  })
})

describe("turning a Mountain wall time into an instant", () => {
  test("an ordinary day resolves at the offset that day stands at", () => {
    expect(mtWallToInstant("2026-01-15", 5, 0).toISOString()).toBe("2026-01-15T12:00:00.000Z")
    expect(mtWallToInstant("2026-07-15", 6, 0).toISOString()).toBe("2026-07-15T12:00:00.000Z")
  })

  test("across the spring gap, both sides of the change resolve at their own offset", () => {
    expect(mtWallToInstant("2026-03-08", 0, 0).toISOString()).toBe("2026-03-08T07:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 1, 0).toISOString()).toBe("2026-03-08T08:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 3, 0).toISOString()).toBe("2026-03-08T09:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 4, 0).toISOString()).toBe("2026-03-08T10:00:00.000Z")
  })

  test("a wall time in the gap that never happened answers as the hour before it", () => {
    expect(mtWallToInstant("2026-03-08", 2, 0).toISOString()).toBe("2026-03-08T08:00:00.000Z")
    expect(mtWallToInstant("2026-03-08", 2, 0).getTime()).toBe(
      mtWallToInstant("2026-03-08", 1, 0).getTime()
    )
  })

  test("across the fall repeat, the hour that happens twice resolves to its first pass", () => {
    expect(mtWallToInstant("2026-11-01", 0, 0).toISOString()).toBe("2026-11-01T06:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 1, 0).toISOString()).toBe("2026-11-01T07:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 1, 59).toISOString()).toBe("2026-11-01T07:59:00.000Z")
    expect(mtWallToInstant("2026-11-01", 2, 0).toISOString()).toBe("2026-11-01T09:00:00.000Z")
    expect(mtWallToInstant("2026-11-01", 3, 0).toISOString()).toBe("2026-11-01T10:00:00.000Z")
  })

  test("a wall time turned into an instant reads back as the same wall time, off the gap", () => {
    for (const [day, hh] of [
      ["2026-03-08", 4],
      ["2026-11-01", 3],
      ["2026-06-01", 13],
    ] as const) {
      expect(mtWallHm(mtWallToInstant(day, hh, 30))).toBe(`${String(hh).padStart(2, "0")}:30`)
    }
  })

  test("a day that is no date comes back as an Invalid Date and no refusal", () => {
    expect(mtWallToInstant("nope", 7, 0).getTime()).toBeNaN()
    expect(mtWallToInstant("", 7, 0).getTime()).toBeNaN()
  })

  test("a month or day past the end of the calendar rolls forward instead of refusing", () => {
    expect(mtWallToInstant("2026-13-45", 7, 0).toISOString()).toBe("2027-02-14T14:00:00.000Z")
    expect(mtWallToInstant("2026-02-30", 7, 0).toISOString()).toBe("2026-03-02T14:00:00.000Z")
  })
})

describe("the day an evening is counted into", () => {
  test("before 18:00 Mountain, the day is the calendar day it is", () => {
    expect(getMountainEveningDayStr(new Date("2026-03-05T23:59:00Z"))).toBe("2026-03-05")
    expect(getMountainEveningDayStr(new Date("2026-03-06T00:00:00Z"))).toBe("2026-03-05")
  })

  test("from 18:00 Mountain, the day is the next calendar day", () => {
    expect(getMountainEveningDayStr(new Date("2026-03-06T01:00:00Z"))).toBe("2026-03-06")
    expect(getMountainEveningDayStr(new Date("2026-03-06T04:00:00Z"))).toBe("2026-03-06")
  })

  test("the boundary is 18:00 exactly, which belongs to the next day", () => {
    expect(mtWallHm(new Date("2026-11-02T00:59:00Z"))).toBe("17:59")
    expect(getMountainEveningDayStr(new Date("2026-11-02T00:59:00Z"))).toBe("2026-11-01")
    expect(mtWallHm(new Date("2026-11-02T01:00:00Z"))).toBe("18:00")
    expect(getMountainEveningDayStr(new Date("2026-11-02T01:00:00Z"))).toBe("2026-11-02")
  })

  test("an evening at the end of a month or a year rolls to the day after it", () => {
    expect(getMountainEveningDayStr(new Date("2027-01-01T01:00:00Z"))).toBe("2027-01-01")
    expect(getMountainEveningDayStr(new Date("2026-04-01T01:00:00Z"))).toBe("2026-04-01")
  })
})
