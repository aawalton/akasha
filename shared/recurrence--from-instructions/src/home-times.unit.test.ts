import { describe, expect, it } from "bun:test"
import { mtWallHm, mtWallToInstant } from "./home-times"

describe("mtWallToInstant", () => {
  it("winter wall-clock is interpreted as MST (UTC−7)", () => {
    expect(mtWallToInstant("2026-02-15", 9, 0)).toEqual(new Date("2026-02-15T16:00:00Z"))
  })

  it("summer wall-clock is interpreted as MDT (UTC−6)", () => {
    expect(mtWallToInstant("2026-07-15", 9, 0)).toEqual(new Date("2026-07-15T15:00:00Z"))
  })

  it("midnight MST resolves to 07:00 UTC", () => {
    expect(mtWallToInstant("2026-02-15", 0, 0)).toEqual(new Date("2026-02-15T07:00:00Z"))
  })

  it("a late-evening MDT wall-clock crosses into the next UTC day", () => {
    expect(mtWallToInstant("2026-07-15", 22, 30)).toEqual(new Date("2026-07-16T04:30:00Z"))
  })

  it("the morning of the spring-forward day is already MDT", () => {
    expect(mtWallToInstant("2026-03-08", 9, 0)).toEqual(new Date("2026-03-08T15:00:00Z"))
  })
})

describe("mtWallHm", () => {
  it("renders a winter instant in MST", () => {
    expect(mtWallHm(new Date("2026-02-15T16:00:00Z"))).toBe("09:00")
  })

  it("renders a summer instant in MDT", () => {
    expect(mtWallHm(new Date("2026-07-15T15:00:00Z"))).toBe("09:00")
  })

  it("renders the MST midnight boundary as 00:00", () => {
    expect(mtWallHm(new Date("2026-02-15T07:00:00Z"))).toBe("00:00")
  })

  it("renders a late-evening MDT instant", () => {
    expect(mtWallHm(new Date("2026-07-16T04:30:00Z"))).toBe("22:30")
  })
})
