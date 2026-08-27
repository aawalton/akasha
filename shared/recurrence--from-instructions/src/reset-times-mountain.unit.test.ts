import { describe, expect, it } from "bun:test"
import { mtWallToInstant } from "./home-times"
import {
  getDenverDayEnd,
  getEsoDayStr,
  getMountainEveningDayStr,
  getMountainMorningDayStr,
} from "./reset-times"

describe("getDenverDayEnd", () => {
  it("midwinter MST → upcoming local midnight is next day at 07:00 UTC", () => {
    const now = new Date("2026-02-15T19:00:00Z")
    expect(getDenverDayEnd(now)).toEqual(new Date("2026-02-16T07:00:00Z"))
  })

  it("midsummer MDT → upcoming local midnight is next day at 06:00 UTC", () => {
    const now = new Date("2026-07-15T18:00:00Z")
    expect(getDenverDayEnd(now)).toEqual(new Date("2026-07-16T06:00:00Z"))
  })

  it("just before MST local midnight → that same upcoming midnight", () => {
    const now = new Date("2026-02-16T06:59:00Z")
    expect(getDenverDayEnd(now)).toEqual(new Date("2026-02-16T07:00:00Z"))
  })

  it("just after MDT local midnight → the following midnight", () => {
    const now = new Date("2026-07-16T06:01:00Z")
    expect(getDenverDayEnd(now)).toEqual(new Date("2026-07-17T06:00:00Z"))
  })
})

describe("getMountainMorningDayStr", () => {
  it("after 06:00 MDT → that civil day", () => {
    expect(getMountainMorningDayStr(new Date("2026-06-01T12:30:00Z"))).toBe("2026-06-01")
  })

  it("before 06:00 MDT → previous civil day", () => {
    expect(getMountainMorningDayStr(new Date("2026-06-01T11:30:00Z"))).toBe("2026-05-31")
  })

  it("exactly 06:00 MDT → that civil day (boundary is inclusive)", () => {
    expect(getMountainMorningDayStr(new Date("2026-06-01T12:00:00Z"))).toBe("2026-06-01")
  })

  it("after 06:00 MST → that civil day", () => {
    expect(getMountainMorningDayStr(new Date("2026-02-16T13:30:00Z"))).toBe("2026-02-16")
  })

  it("before 06:00 MST → previous civil day", () => {
    expect(getMountainMorningDayStr(new Date("2026-02-16T12:30:00Z"))).toBe("2026-02-15")
  })

  it("differs from the ESO NA day in the 2-hour gap between the two 06:00 boundaries", () => {
    const inGap = new Date("2026-06-01T11:00:00Z")
    expect(getEsoDayStr(inGap)).toBe("2026-06-01")
    expect(getMountainMorningDayStr(inGap)).toBe("2026-05-31")
  })
})

describe("getMountainEveningDayStr", () => {
  it("finish before 18:00 → that civil day (early-morning sleep finish)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-07-05", 3, 15))).toBe("2026-07-05")
  })

  it("finish at/after 18:00 → the NEXT civil day (evening sleep finish)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-07-05", 20, 58))).toBe("2026-07-06")
  })

  it("afternoon finish (nap) stays on the same civil day", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-07-05", 15, 0))).toBe("2026-07-05")
  })

  it("exactly 18:00:00 attributes to the LATER day (tie-break)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-07-05", 18, 0))).toBe("2026-07-06")
  })

  it("17:59 stays on the same day (just before the boundary)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-07-05", 17, 59))).toBe("2026-07-05")
  })

  it("is DST-aware on the spring-forward day (MST→MDT)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-03-08", 18, 30))).toBe("2026-03-09")
  })

  it("is DST-aware on the fall-back day (MDT→MST)", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-11-01", 18, 30))).toBe("2026-11-02")
  })

  it("handles MST-season afternoon vs evening", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-02-16", 17, 0))).toBe("2026-02-16")
    expect(getMountainEveningDayStr(mtWallToInstant("2026-02-16", 18, 0))).toBe("2026-02-17")
  })

  it("rolls across a month/year boundary at 18:00", () => {
    expect(getMountainEveningDayStr(mtWallToInstant("2026-12-31", 18, 30))).toBe("2027-01-01")
  })
})
