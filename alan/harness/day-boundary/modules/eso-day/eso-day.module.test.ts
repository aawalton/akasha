import { describe, expect, test } from "bun:test"
import {
  diffEsoDays,
  getEsoDayStr,
  getEsoDayWindow,
  getEsoResetTime,
} from "akasha/alan/harness/day-boundary/modules/eso-day/eso-day.module.code.ts"

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

  test("the morning after springing forward belongs to the day the reset opened", () => {
    expect(getEsoDayStr(new Date("2026-03-09T04:00:00Z"))).toBe("2026-03-08")
    expect(getEsoDayStr(new Date("2026-03-09T04:30:00Z"))).toBe("2026-03-08")
    expect(getEsoDayStr(new Date("2026-03-09T09:59:00Z"))).toBe("2026-03-08")
    expect(getEsoDayStr(new Date("2026-03-09T10:00:00Z"))).toBe("2026-03-09")
  })

  test("the morning after falling back belongs to the day the reset opened", () => {
    expect(getEsoDayStr(new Date("2026-11-02T05:00:00Z"))).toBe("2026-11-01")
    expect(getEsoDayStr(new Date("2026-11-02T05:30:00Z"))).toBe("2026-11-01")
    expect(getEsoDayStr(new Date("2026-11-02T10:59:00Z"))).toBe("2026-11-01")
    expect(getEsoDayStr(new Date("2026-11-02T11:00:00Z"))).toBe("2026-11-02")
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

  test("a day that will not parse is refused, naming the day", () => {
    expect(() => getEsoDayWindow("not-a-day")).toThrow("'not-a-day'")
  })

  test("a day of numbers that is no real YYYY-MM-DD date is refused", () => {
    for (const day of ["2026-02-30", "2026-13-01", "2026-1-5", "2026-01-15T00:00", ""]) {
      expect(() => getEsoDayWindow(day)).toThrow(`'${day}'`)
    }
  })
})

describe("the calendar days between two eso days", () => {
  test("two days are counted apart as calendar days, across a clock change", () => {
    expect(diffEsoDays("2026-03-09", "2026-03-07")).toBe(2)
    expect(diffEsoDays("2026-01-01", "2026-12-31")).toBe(-364)
    expect(diffEsoDays("2026-07-04", "2026-07-04")).toBe(0)
  })

  test("a day that will not parse on either side is refused, naming that day", () => {
    expect(() => diffEsoDays("not-a-day", "2026-07-04")).toThrow("'not-a-day'")
    expect(() => diffEsoDays("2026-07-04", "2026-02-30")).toThrow("'2026-02-30'")
  })
})

describe("the reset an instant is counted from", () => {
  test("a plain day is counted from its own 06:00 Eastern", () => {
    const inside = getEsoResetTime(new Date("2026-01-15T12:00:00Z"))
    expect(inside.toISOString()).toBe("2026-01-15T11:00:00.000Z")
    const before = getEsoResetTime(new Date("2026-01-15T10:59:00Z"))
    expect(before.toISOString()).toBe("2026-01-14T11:00:00.000Z")
  })

  test("the morning after springing forward is counted from the reset that opened it", () => {
    const small = getEsoResetTime(new Date("2026-03-09T04:30:00Z"))
    expect(small.toISOString()).toBe("2026-03-08T10:00:00.000Z")
    const later = getEsoResetTime(new Date("2026-03-09T06:30:00Z"))
    expect(later.toISOString()).toBe("2026-03-08T10:00:00.000Z")
    const last = getEsoResetTime(new Date("2026-03-09T09:59:00Z"))
    expect(last.toISOString()).toBe("2026-03-08T10:00:00.000Z")
    const next = getEsoResetTime(new Date("2026-03-09T10:00:00Z"))
    expect(next.toISOString()).toBe("2026-03-09T10:00:00.000Z")
  })

  test("the morning after falling back is counted from the reset that opened it", () => {
    const small = getEsoResetTime(new Date("2026-11-02T05:30:00Z"))
    expect(small.toISOString()).toBe("2026-11-01T11:00:00.000Z")
    const later = getEsoResetTime(new Date("2026-11-02T08:00:00Z"))
    expect(later.toISOString()).toBe("2026-11-01T11:00:00.000Z")
    const next = getEsoResetTime(new Date("2026-11-02T11:00:00Z"))
    expect(next.toISOString()).toBe("2026-11-02T11:00:00.000Z")
  })

  test("the reset an instant is counted from opens that instant's own day", () => {
    for (const at of ["2026-03-09T04:30:00Z", "2026-11-02T05:30:00Z", "2026-06-01T12:00:00Z"]) {
      const now = new Date(at)
      const opened = getEsoDayWindow(getEsoDayStr(now)).start
      expect(getEsoResetTime(now).getTime()).toBe(opened.getTime())
    }
  })
})
