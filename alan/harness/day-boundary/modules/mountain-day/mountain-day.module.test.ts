import { describe, expect, test } from "bun:test"
import {
  getMountainEveningDayStr,
  getMountainMorningDayStr,
} from "akasha/alan/harness/day-boundary/modules/mountain-day/mountain-day.module.code.ts"

describe("where the mountain morning day turns", () => {
  test("the turn is 06:00 Mountain, so 05:59 still belongs to the day before", () => {
    expect(getMountainMorningDayStr(new Date("2026-01-15T12:59:00Z"))).toBe("2026-01-14")
    expect(getMountainMorningDayStr(new Date("2026-01-15T13:00:00Z"))).toBe("2026-01-15")
  })

  test("in summer the turn moves with Mountain daylight time, an hour earlier in UTC", () => {
    expect(getMountainMorningDayStr(new Date("2026-07-04T11:59:00Z"))).toBe("2026-07-03")
    expect(getMountainMorningDayStr(new Date("2026-07-04T12:00:00Z"))).toBe("2026-07-04")
  })

  test("the morning after springing forward belongs to the day the turn opened", () => {
    expect(getMountainMorningDayStr(new Date("2026-03-09T06:00:00Z"))).toBe("2026-03-08")
    expect(getMountainMorningDayStr(new Date("2026-03-09T06:30:00Z"))).toBe("2026-03-08")
    expect(getMountainMorningDayStr(new Date("2026-03-09T11:59:00Z"))).toBe("2026-03-08")
    expect(getMountainMorningDayStr(new Date("2026-03-09T12:00:00Z"))).toBe("2026-03-09")
  })

  test("the morning after falling back belongs to the day the turn opened", () => {
    expect(getMountainMorningDayStr(new Date("2026-11-02T07:00:00Z"))).toBe("2026-11-01")
    expect(getMountainMorningDayStr(new Date("2026-11-02T07:30:00Z"))).toBe("2026-11-01")
    expect(getMountainMorningDayStr(new Date("2026-11-02T12:59:00Z"))).toBe("2026-11-01")
    expect(getMountainMorningDayStr(new Date("2026-11-02T13:00:00Z"))).toBe("2026-11-02")
  })

  test("a month and a year turn at the morning turn rather than at midnight", () => {
    expect(getMountainMorningDayStr(new Date("2027-01-01T06:00:00Z"))).toBe("2026-12-31")
    expect(getMountainMorningDayStr(new Date("2027-01-01T13:00:00Z"))).toBe("2027-01-01")
  })
})

describe("where the mountain evening day turns", () => {
  test("the turn is 18:00 Mountain, so 17:59 is still the day that is running", () => {
    expect(getMountainEveningDayStr(new Date("2026-01-16T00:59:00Z"))).toBe("2026-01-15")
    expect(getMountainEveningDayStr(new Date("2026-01-16T01:00:00Z"))).toBe("2026-01-16")
  })
})
