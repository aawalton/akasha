import { describe, expect, test } from "bun:test"
import { nyWallToInstant } from "./new-york-wall.module.code.ts"

describe("turning an Eastern wall time into an instant", () => {
  test("an ordinary day resolves at the offset that day stands at", () => {
    expect(nyWallToInstant("2026-01-15", 6, 0).toISOString()).toBe("2026-01-15T11:00:00.000Z")
    expect(nyWallToInstant("2026-07-15", 6, 0).toISOString()).toBe("2026-07-15T10:00:00.000Z")
  })

  test("the two passes carry the transition days, gap and repeat alike", () => {
    expect(nyWallToInstant("2026-03-08", 1, 0).toISOString()).toBe("2026-03-08T06:00:00.000Z")
    expect(nyWallToInstant("2026-03-08", 2, 30).toISOString()).toBe("2026-03-08T06:30:00.000Z")
    expect(nyWallToInstant("2026-03-08", 3, 0).toISOString()).toBe("2026-03-08T07:00:00.000Z")
    expect(nyWallToInstant("2026-11-01", 1, 0).toISOString()).toBe("2026-11-01T05:00:00.000Z")
    expect(nyWallToInstant("2026-11-01", 2, 0).toISOString()).toBe("2026-11-01T07:00:00.000Z")
  })

  // KNOWN DEFECT: a day string that is no date should be refused rather than answered with an
  // Invalid Date.
  test("a day that is no date comes back as an Invalid Date", () => {
    expect(nyWallToInstant("nope", 6, 0).getTime()).toBeNaN()
  })
})
