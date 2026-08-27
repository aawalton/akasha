import { describe, expect, test } from "bun:test"
import { formatSmartDate } from "./format-smart-date"

const now = new Date("2026-01-15T17:00:00Z")

describe("formatSmartDate", () => {
  describe("adjacent days", () => {
    test("diff 0 returns 'Today'", () => {
      expect(formatSmartDate("2026-01-15", now)).toBe("Today")
    })

    test("diff -1 returns 'Yesterday'", () => {
      expect(formatSmartDate("2026-01-14", now)).toBe("Yesterday")
    })

    test("diff +1 returns 'Tomorrow'", () => {
      expect(formatSmartDate("2026-01-16", now)).toBe("Tomorrow")
    })
  })

  describe("last week (diff -2..-6)", () => {
    test("diff -2 returns 'Last Tuesday'", () => {
      expect(formatSmartDate("2026-01-13", now)).toBe("Last Tuesday")
    })

    test("diff -3 returns 'Last Monday'", () => {
      expect(formatSmartDate("2026-01-12", now)).toBe("Last Monday")
    })

    test("diff -6 returns 'Last Friday'", () => {
      expect(formatSmartDate("2026-01-09", now)).toBe("Last Friday")
    })
  })

  describe("next week (diff +2..+6)", () => {
    test("diff +2 returns 'Next Saturday'", () => {
      expect(formatSmartDate("2026-01-17", now)).toBe("Next Saturday")
    })

    test("diff +4 returns 'Next Monday'", () => {
      expect(formatSmartDate("2026-01-19", now)).toBe("Next Monday")
    })

    test("diff +6 returns 'Next Wednesday'", () => {
      expect(formatSmartDate("2026-01-21", now)).toBe("Next Wednesday")
    })
  })

  describe("absolute past (diff <= -7)", () => {
    test("diff -7 returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2026-01-08", now)).toBe("08 Jan 2026")
    })

    test("further same-year past returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2026-01-07", now)).toBe("07 Jan 2026")
      expect(formatSmartDate("2026-01-01", now)).toBe("01 Jan 2026")
    })

    test("previous-year past returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2025-12-31", now)).toBe("31 Dec 2025")
      expect(formatSmartDate("2020-06-15", now)).toBe("15 Jun 2020")
    })
  })

  describe("absolute future (diff >= +7)", () => {
    test("diff +7 returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2026-01-22", now)).toBe("22 Jan 2026")
    })

    test("further same-year future returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2026-01-29", now)).toBe("29 Jan 2026")
      expect(formatSmartDate("2026-12-31", now)).toBe("31 Dec 2026")
    })

    test("future-year returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2027-01-01", now)).toBe("01 Jan 2027")
      expect(formatSmartDate("2030-03-15", now)).toBe("15 Mar 2030")
    })
  })

  describe("passthrough", () => {
    test("non-ISO string passes through unchanged", () => {
      expect(formatSmartDate("not-a-date", now)).toBe("not-a-date")
    })

    test("empty string passes through unchanged", () => {
      expect(formatSmartDate("", now)).toBe("")
    })

    test("partial ISO string passes through unchanged", () => {
      expect(formatSmartDate("2026-01", now)).toBe("2026-01")
    })

    test("ISO datetime (with T) passes through unchanged", () => {
      expect(formatSmartDate("2026-01-15T12:00:00Z", now)).toBe("2026-01-15T12:00:00Z")
    })
  })

  describe("leap year and year boundaries", () => {
    test("leap: Feb 29 is 'Tomorrow' from Feb 28 2024", () => {
      const leapNow = new Date("2024-02-28T17:00:00Z")
      expect(formatSmartDate("2024-02-29", leapNow)).toBe("Tomorrow")
    })

    test("leap: Feb 29 2024 from main now returns 'DD MMM YYYY'", () => {
      expect(formatSmartDate("2024-02-29", now)).toBe("29 Feb 2024")
    })

    test("year boundary: Dec 31 is 'Yesterday' from Jan 1", () => {
      const janFirst = new Date("2026-01-01T17:00:00Z")
      expect(formatSmartDate("2025-12-31", janFirst)).toBe("Yesterday")
    })

    test("year boundary: Jan 1 is 'Tomorrow' from Dec 31", () => {
      const decLast = new Date("2025-12-31T17:00:00Z")
      expect(formatSmartDate("2026-01-01", decLast)).toBe("Tomorrow")
    })

    test("year boundary: far Dec from Jan returns 'DD MMM YYYY'", () => {
      const janFirst = new Date("2026-01-01T17:00:00Z")
      expect(formatSmartDate("2025-12-01", janFirst)).toBe("01 Dec 2025")
    })
  })
})
