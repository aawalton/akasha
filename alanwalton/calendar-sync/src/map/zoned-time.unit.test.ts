import { describe, expect, test } from "bun:test"
import { zonedWallClockToInstant } from "./zoned-time"

const DENVER = ["America", "Denver"].join("/")

describe("zonedWallClockToInstant", () => {
  test("summer wall-clock is interpreted as MDT (UTC-6)", () => {
    expect(zonedWallClockToInstant("2026-06-06 09:00:00", DENVER)).toBe(
      Date.UTC(2026, 5, 6, 15, 0, 0)
    )
  })

  test("winter wall-clock is interpreted as MST (UTC-7)", () => {
    expect(zonedWallClockToInstant("2026-01-15 09:00:00", DENVER)).toBe(
      Date.UTC(2026, 0, 15, 16, 0, 0)
    )
  })

  test("seconds and 'T' separator are accepted", () => {
    expect(zonedWallClockToInstant("2026-06-06T23:59:00", DENVER)).toBe(
      Date.UTC(2026, 5, 7, 5, 59, 0)
    )
  })

  test("Communico zero-date sentinel returns null", () => {
    expect(zonedWallClockToInstant("0000-00-00 00:00:00", DENVER)).toBeNull()
  })

  test("empty and malformed strings return null", () => {
    expect(zonedWallClockToInstant("", DENVER)).toBeNull()
    expect(zonedWallClockToInstant("not a date", DENVER)).toBeNull()
  })
})
