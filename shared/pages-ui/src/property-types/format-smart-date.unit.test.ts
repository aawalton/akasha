import { describe, expect, it } from "bun:test"
import { formatSmartDate } from "@shared/pages-core/view/format-smart-date"

const NOW = new Date("2026-01-15T17:00:00Z")

describe("formatSmartDate (pages-ui re-export)", () => {
  it("returns 'Today' for the current ESO day", () => {
    expect(formatSmartDate("2026-01-15", NOW)).toBe("Today")
  })

  it("returns 'Yesterday' for the previous day", () => {
    expect(formatSmartDate("2026-01-14", NOW)).toBe("Yesterday")
  })

  it("returns 'Tomorrow' for the next day", () => {
    expect(formatSmartDate("2026-01-16", NOW)).toBe("Tomorrow")
  })

  it("returns 'Last <day>' for diff -2..-6", () => {
    expect(formatSmartDate("2026-01-13", NOW)).toBe("Last Tuesday")
    expect(formatSmartDate("2026-01-12", NOW)).toBe("Last Monday")
    expect(formatSmartDate("2026-01-09", NOW)).toBe("Last Friday")
  })

  it("returns 'Next <day>' for diff +2..+6", () => {
    expect(formatSmartDate("2026-01-17", NOW)).toBe("Next Saturday")
    expect(formatSmartDate("2026-01-19", NOW)).toBe("Next Monday")
    expect(formatSmartDate("2026-01-21", NOW)).toBe("Next Wednesday")
  })

  it("returns 'DD MMM YYYY' for dates beyond ±6 days (always with year)", () => {
    expect(formatSmartDate("2026-01-08", NOW)).toBe("08 Jan 2026")
    expect(formatSmartDate("2026-01-22", NOW)).toBe("22 Jan 2026")
    expect(formatSmartDate("2026-12-25", NOW)).toBe("25 Dec 2026")
  })

  it("returns 'DD MMM YYYY' for different-year dates", () => {
    expect(formatSmartDate("2025-12-31", NOW)).toBe("31 Dec 2025")
    expect(formatSmartDate("2027-01-01", NOW)).toBe("01 Jan 2027")
  })

  it("passes through non-ISO strings unchanged", () => {
    expect(formatSmartDate("Tue Sep 30", NOW)).toBe("Tue Sep 30")
    expect(formatSmartDate("not a date", NOW)).toBe("not a date")
    expect(formatSmartDate("", NOW)).toBe("")
  })
})
