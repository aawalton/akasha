import { describe, expect, test } from "bun:test"
import { getEsoDayStr, getEsoDayWindow } from "./eso-day.module.code.ts"

/**
 * The eso day is US Eastern, and it turns at 06:00 rather than at midnight.
 *
 * That is two facts a reader has to hold at once, and they pull in different directions from the
 * Mountain clock the tracking commands otherwise speak: Eastern is an hour or two ahead of Mountain,
 * and 06:00 Eastern is 04:00 Mountain.
 */
describe("where the eso day turns", () => {
  test("the reset is 06:00 Eastern, so 05:59 still belongs to the day before", () => {
    expect(getEsoDayStr(new Date("2026-03-05T10:59:00Z"))).toBe("2026-03-04")
    expect(getEsoDayStr(new Date("2026-03-05T11:00:00Z"))).toBe("2026-03-05")
  })

  test("the small hours of a night belong to the day that has not ended", () => {
    expect(getEsoDayStr(new Date("2026-03-05T04:00:00Z"))).toBe("2026-03-04")
    expect(getEsoDayStr(new Date("2026-03-05T05:59:00Z"))).toBe("2026-03-04")
  })

  test("in summer the reset moves with Eastern daylight time, an hour earlier in UTC", () => {
    expect(getEsoDayStr(new Date("2026-07-04T09:59:00Z"))).toBe("2026-07-03")
    expect(getEsoDayStr(new Date("2026-07-04T10:00:00Z"))).toBe("2026-07-04")
  })

  test("Eastern is five behind in winter and four in summer", () => {
    expect(getEsoDayStr(new Date("2026-01-15T04:59:00Z"))).toBe("2026-01-14")
    expect(getEsoDayStr(new Date("2026-01-15T11:00:00Z"))).toBe("2026-01-15")
  })

  test("a day still has one reset on each of the two transition days", () => {
    expect(getEsoDayStr(new Date("2026-03-08T06:00:00Z"))).toBe("2026-03-07")
    expect(getEsoDayStr(new Date("2026-03-08T09:59:00Z"))).toBe("2026-03-07")
    expect(getEsoDayStr(new Date("2026-03-08T10:00:00Z"))).toBe("2026-03-08")
    expect(getEsoDayStr(new Date("2026-11-01T05:59:00Z"))).toBe("2026-10-31")
    expect(getEsoDayStr(new Date("2026-11-01T10:59:00Z"))).toBe("2026-10-31")
    expect(getEsoDayStr(new Date("2026-11-01T11:00:00Z"))).toBe("2026-11-01")
  })

  test("a month and a year turn at the reset, not at midnight", () => {
    expect(getEsoDayStr(new Date("2027-01-01T05:00:00Z"))).toBe("2026-12-31")
    expect(getEsoDayStr(new Date("2027-01-01T11:00:00Z"))).toBe("2027-01-01")
  })
})

describe("the window a named eso day covers", () => {
  test("a day runs from its own 06:00 Eastern to the next day's", () => {
    const winter = getEsoDayWindow("2026-01-15")
    expect(winter.start.toISOString()).toBe("2026-01-15T11:00:00.000Z")
    expect(winter.end.toISOString()).toBe("2026-01-16T11:00:00.000Z")
  })

  test("the spring day is an hour short and the fall day an hour long", () => {
    const spring = getEsoDayWindow("2026-03-08")
    expect(spring.start.toISOString()).toBe("2026-03-08T10:00:00.000Z")
    expect(spring.end.toISOString()).toBe("2026-03-09T10:00:00.000Z")
    const beforeSpring = getEsoDayWindow("2026-03-07")
    expect(beforeSpring.end.getTime() - beforeSpring.start.getTime()).toBe(23 * 3_600_000)
    const beforeFall = getEsoDayWindow("2026-10-31")
    expect(beforeFall.end.getTime() - beforeFall.start.getTime()).toBe(25 * 3_600_000)
  })

  test("the window ends where the next day's begins, with no gap and no overlap", () => {
    for (const day of ["2026-03-07", "2026-06-01", "2026-10-31"]) {
      const one = getEsoDayWindow(day)
      const next = getEsoDayWindow(getEsoDayStr(new Date(one.end.getTime() + 1000)))
      expect(next.start.getTime()).toBe(one.end.getTime())
    }
  })

  test("the last month of a year runs into the first of the next", () => {
    const last = getEsoDayWindow("2026-12-31")
    expect(last.end.toISOString()).toBe("2027-01-01T11:00:00.000Z")
  })

  // KNOWN DEFECT: a day string that is no date should be refused; a window of the epoch to the
  // epoch is an empty range that reads as a real answer and finds nothing.
  test("a day that is no date is answered with the epoch twice, and no refusal", () => {
    const nowhere = getEsoDayWindow("not-a-day")
    expect(nowhere.start.getTime()).toBe(0)
    expect(nowhere.end.getTime()).toBe(0)
  })
})
