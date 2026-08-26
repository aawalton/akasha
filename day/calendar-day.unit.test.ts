import { describe, expect, it } from "bun:test"
import { dayAfter } from "./calendar-day.ts"

describe("dayAfter", () => {
  it("takes an ordinary day to the next one", () => {
    expect(dayAfter("2026-08-18")).toBe("2026-08-19")
  })

  it("crosses the end of a month", () => {
    expect(dayAfter("2026-08-31")).toBe("2026-09-01")
  })

  it("crosses the end of a year", () => {
    expect(dayAfter("2026-12-31")).toBe("2027-01-01")
  })

  it("crosses the end of February in a leap year", () => {
    expect(dayAfter("2028-02-28")).toBe("2028-02-29")
    expect(dayAfter("2028-02-29")).toBe("2028-03-01")
  })

  it("crosses the end of February in a common year", () => {
    expect(dayAfter("2026-02-28")).toBe("2026-03-01")
  })

  it("crosses a spring-forward day, which has only 23 hours of wall time", () => {
    expect(dayAfter("2026-03-08")).toBe("2026-03-09")
  })

  it("hands back what it was given where that names no day", () => {
    expect(dayAfter("not-a-day")).toBe("not-a-day")
  })
})
