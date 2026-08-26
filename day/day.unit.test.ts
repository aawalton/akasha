import { describe, expect, it } from "bun:test"
import {
  diffEsoDays,
  getEsoDayAnchor,
  getEsoDayStr,
  getEsoDayStrOffset,
  getEsoDayWindow,
  getEsoResetTime,
  nyWallHm,
  nyWallToInstant,
} from "./day.ts"

describe("getEsoResetTime", () => {
  it("midwinter EST after reset → reset is today at 11:00 UTC", () => {
    const now = new Date("2026-02-15T12:00:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-02-15T11:00:00Z"))
  })

  it("midwinter EST before reset → reset is yesterday at 11:00 UTC", () => {
    const now = new Date("2026-02-15T10:30:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-02-14T11:00:00Z"))
  })

  it("midsummer EDT after reset → reset is today at 10:00 UTC", () => {
    const now = new Date("2026-07-15T12:00:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-07-15T10:00:00Z"))
  })

  it("midsummer EDT before reset → reset is yesterday at 10:00 UTC", () => {
    const now = new Date("2026-07-15T09:30:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-07-14T10:00:00Z"))
  })

  it("spring DST transition day after reset (10:00 UTC = 06:00 EDT)", () => {
    const now = new Date("2026-03-08T11:00:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-03-08T10:00:00Z"))
  })

  it("spring DST transition day before that day's reset → previous EST reset", () => {
    const now = new Date("2026-03-08T09:00:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-03-07T11:00:00Z"))
  })

  it("fall DST transition day after reset (11:00 UTC = 06:00 EST)", () => {
    const now = new Date("2026-11-01T12:00:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-11-01T11:00:00Z"))
  })

  it("fall DST transition day before that day's reset → previous EDT reset", () => {
    const now = new Date("2026-11-01T10:30:00Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-10-31T10:00:00Z"))
  })

  it("exact reset moment (EDT) is the reset itself", () => {
    const now = new Date("2026-07-15T10:00:00.000Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-07-15T10:00:00Z"))
  })

  it("one ms before reset (EDT) → previous day's reset", () => {
    const now = new Date("2026-07-15T09:59:59.999Z")
    expect(getEsoResetTime(now)).toEqual(new Date("2026-07-14T10:00:00Z"))
  })
})

describe("getEsoDayStr", () => {
  it("midwinter EST after reset", () => {
    expect(getEsoDayStr(new Date("2026-02-15T12:00:00Z"))).toBe("2026-02-15")
  })

  it("midwinter EST before reset", () => {
    expect(getEsoDayStr(new Date("2026-02-15T10:30:00Z"))).toBe("2026-02-14")
  })

  it("midsummer EDT after reset", () => {
    expect(getEsoDayStr(new Date("2026-07-15T12:00:00Z"))).toBe("2026-07-15")
  })

  it("midsummer EDT before reset", () => {
    expect(getEsoDayStr(new Date("2026-07-15T09:30:00Z"))).toBe("2026-07-14")
  })

  it("spring DST transition day after reset", () => {
    expect(getEsoDayStr(new Date("2026-03-08T11:00:00Z"))).toBe("2026-03-08")
  })

  it("spring DST transition day before reset (still in previous EST day)", () => {
    expect(getEsoDayStr(new Date("2026-03-08T09:00:00Z"))).toBe("2026-03-07")
  })

  it("fall DST transition day after reset", () => {
    expect(getEsoDayStr(new Date("2026-11-01T12:00:00Z"))).toBe("2026-11-01")
  })

  it("fall DST transition day before reset (still in previous EDT day)", () => {
    expect(getEsoDayStr(new Date("2026-11-01T10:30:00Z"))).toBe("2026-10-31")
  })

  it("year boundary: before 2026-01-01 EST reset rolls back to 2025-12-31", () => {
    expect(getEsoDayStr(new Date("2026-01-01T05:00:00Z"))).toBe("2025-12-31")
  })
})

describe("getEsoDayStrOffset", () => {
  it("positive offset midsummer (+1 day)", () => {
    expect(getEsoDayStrOffset(new Date("2026-07-15T12:00:00Z"), 1)).toBe("2026-07-16")
  })

  it("positive offset midwinter (+7 days)", () => {
    expect(getEsoDayStrOffset(new Date("2026-02-15T12:00:00Z"), 7)).toBe("2026-02-22")
  })

  it("negative offset midsummer (-1 day)", () => {
    expect(getEsoDayStrOffset(new Date("2026-07-15T12:00:00Z"), -1)).toBe("2026-07-14")
  })

  it("crossing DST forward (+1 from day before spring transition)", () => {
    expect(getEsoDayStrOffset(new Date("2026-03-07T12:00:00Z"), 1)).toBe("2026-03-08")
  })

  it("crossing DST backward (+1 from day before fall transition)", () => {
    expect(getEsoDayStrOffset(new Date("2026-10-31T12:00:00Z"), 1)).toBe("2026-11-01")
  })

  it("zero offset matches getEsoDayStr for any midsummer instant", () => {
    const now = new Date("2026-07-15T12:00:00Z")
    expect(getEsoDayStrOffset(now, 0)).toBe(getEsoDayStr(now))
  })
})

describe("getEsoDayAnchor", () => {
  it("midwinter EST after reset → noon UTC of same day", () => {
    expect(getEsoDayAnchor(new Date("2026-02-15T12:00:00Z"))).toEqual(
      new Date("2026-02-15T12:00:00Z")
    )
  })

  it("midwinter EST before reset → noon UTC of previous day", () => {
    expect(getEsoDayAnchor(new Date("2026-02-15T10:30:00Z"))).toEqual(
      new Date("2026-02-14T12:00:00Z")
    )
  })

  it("midsummer EDT after reset → noon UTC of same day", () => {
    expect(getEsoDayAnchor(new Date("2026-07-15T12:00:00Z"))).toEqual(
      new Date("2026-07-15T12:00:00Z")
    )
  })

  it("midsummer EDT before reset → noon UTC of previous day", () => {
    expect(getEsoDayAnchor(new Date("2026-07-15T08:00:00Z"))).toEqual(
      new Date("2026-07-14T12:00:00Z")
    )
  })

  it("UTC fields of the anchor agree with getEsoDayStr at fall DST transition", () => {
    const inst = new Date("2026-11-01T10:30:00Z")
    const anchor = getEsoDayAnchor(inst)
    const pad = (n: number) => (n < 10 ? `0${n}` : String(n))
    const fields = `${anchor.getUTCFullYear()}-${pad(anchor.getUTCMonth() + 1)}-${pad(anchor.getUTCDate())}`
    expect(fields).toBe(getEsoDayStr(inst))
    expect(anchor.getUTCHours()).toBe(12)
    expect(anchor.getUTCMinutes()).toBe(0)
    expect(anchor.getUTCSeconds()).toBe(0)
    expect(anchor.getUTCMilliseconds()).toBe(0)
  })

  it("year boundary: pre-reset instant rolls back across year", () => {
    expect(getEsoDayAnchor(new Date("2026-01-01T05:00:00Z"))).toEqual(
      new Date("2025-12-31T12:00:00Z")
    )
  })
})

describe("getEsoDayWindow", () => {
  it("midsummer EDT day → [10:00 UTC, next day 10:00 UTC)", () => {
    const window = getEsoDayWindow("2026-06-11")
    expect(window.start).toEqual(new Date("2026-06-11T10:00:00.000Z"))
    expect(window.end).toEqual(new Date("2026-06-12T10:00:00.000Z"))
  })

  it("midwinter EST day → [11:00 UTC, next day 11:00 UTC)", () => {
    const window = getEsoDayWindow("2026-01-15")
    expect(window.start).toEqual(new Date("2026-01-15T11:00:00.000Z"))
    expect(window.end).toEqual(new Date("2026-01-16T11:00:00.000Z"))
  })

  it("day before spring transition is the 23-hour day (EST start, EDT end)", () => {
    const window = getEsoDayWindow("2026-03-07")
    expect(window.start).toEqual(new Date("2026-03-07T11:00:00.000Z"))
    expect(window.end).toEqual(new Date("2026-03-08T10:00:00.000Z"))
  })

  it("spring transition day itself → both ends EDT (10:00 UTC)", () => {
    const window = getEsoDayWindow("2026-03-08")
    expect(window.start).toEqual(new Date("2026-03-08T10:00:00.000Z"))
    expect(window.end).toEqual(new Date("2026-03-09T10:00:00.000Z"))
  })

  it("day before fall transition is the 25-hour day (EDT start, EST end)", () => {
    const window = getEsoDayWindow("2026-10-31")
    expect(window.start).toEqual(new Date("2026-10-31T10:00:00.000Z"))
    expect(window.end).toEqual(new Date("2026-11-01T11:00:00.000Z"))
  })

  it("round-trips with getEsoDayStr at both edges of the window", () => {
    for (const day of ["2026-06-11", "2026-01-15", "2026-03-07", "2026-03-08", "2026-10-31"]) {
      const window = getEsoDayWindow(day)
      expect(getEsoDayStr(new Date(window.start.getTime()))).toBe(day)
      expect(getEsoDayStr(new Date(window.end.getTime() - 1))).toBe(day)
    }
  })
})

describe("diffEsoDays", () => {
  it("same day → 0", () => {
    expect(diffEsoDays("2026-05-03", "2026-05-03")).toBe(0)
  })

  it("one day forward → 1", () => {
    expect(diffEsoDays("2026-05-04", "2026-05-03")).toBe(1)
  })

  it("one day backward → -1", () => {
    expect(diffEsoDays("2026-05-03", "2026-05-04")).toBe(-1)
  })

  it("seven days forward → 7", () => {
    expect(diffEsoDays("2026-05-10", "2026-05-03")).toBe(7)
  })

  it("crossing month boundary", () => {
    expect(diffEsoDays("2026-06-01", "2026-05-30")).toBe(2)
  })

  it("crossing year boundary", () => {
    expect(diffEsoDays("2026-01-01", "2025-12-30")).toBe(2)
  })

  it("crossing leap-day boundary 2024", () => {
    expect(diffEsoDays("2024-03-01", "2024-02-28")).toBe(2)
  })

  it("crossing the spring DST transition is still calendar-day count", () => {
    expect(diffEsoDays("2026-03-09", "2026-03-07")).toBe(2)
  })

  it("crossing the fall DST transition is still calendar-day count", () => {
    expect(diffEsoDays("2026-11-02", "2026-10-31")).toBe(2)
  })

  it("matches getEsoDayStrOffset for any (anchor, +n) pair", () => {
    const now = new Date("2026-07-15T12:00:00Z")
    const today = getEsoDayStr(now)
    expect(diffEsoDays(getEsoDayStrOffset(now, 5), today)).toBe(5)
    expect(diffEsoDays(getEsoDayStrOffset(now, -3), today)).toBe(-3)
  })

  it("malformed input returns 0 (defensive)", () => {
    expect(diffEsoDays("not-a-date", "2026-05-03")).toBe(0)
    expect(diffEsoDays("2026-05-03", "not-a-date")).toBe(0)
  })
})

describe("nyWallToInstant", () => {
  it("EST wall time → UTC-5 instant (09:00 NY = 14:00 UTC)", () => {
    expect(nyWallToInstant("2026-02-15", 9, 0)).toEqual(new Date("2026-02-15T14:00:00Z"))
  })

  it("EDT wall time → UTC-4 instant (09:00 NY = 13:00 UTC)", () => {
    expect(nyWallToInstant("2026-07-15", 9, 0)).toEqual(new Date("2026-07-15T13:00:00Z"))
  })

  it("EST midnight → 05:00 UTC", () => {
    expect(nyWallToInstant("2026-02-15", 0, 0)).toEqual(new Date("2026-02-15T05:00:00Z"))
  })

  it("EDT half-hour minute precision (14:30 NY = 18:30 UTC)", () => {
    expect(nyWallToInstant("2026-07-15", 14, 30)).toEqual(new Date("2026-07-15T18:30:00Z"))
  })
})

describe("nyWallHm", () => {
  it("EST instant → NY-local HH:MM (14:00 UTC = 09:00 NY)", () => {
    expect(nyWallHm(new Date("2026-02-15T14:00:00Z"))).toBe("09:00")
  })

  it("EDT instant → NY-local HH:MM (18:30 UTC = 14:30 NY)", () => {
    expect(nyWallHm(new Date("2026-07-15T18:30:00Z"))).toBe("14:30")
  })

  it("zero-pads single-digit hours (05:00 UTC EST = 00:00 NY)", () => {
    expect(nyWallHm(new Date("2026-02-15T05:00:00Z"))).toBe("00:00")
  })
})
