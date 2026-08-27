import { describe, expect, test } from "bun:test"
import {
  resolveDateSentinel,
  resolveInstantSentinel,
  resolveRelativeToToday,
  resolveRelativeToTodayInstant,
} from "./date-sentinels"

const NOW = new Date("2026-04-10T16:00:00.000Z")

describe("resolveDateSentinel", () => {
  test("today returns current date (EDT, well past reset)", () => {
    expect(resolveDateSentinel("today", undefined, NOW)).toBe("2026-04-10")
  })

  test("tomorrow returns next day", () => {
    expect(resolveDateSentinel("tomorrow", undefined, NOW)).toBe("2026-04-11")
  })

  test("yesterday returns previous day", () => {
    expect(resolveDateSentinel("yesterday", undefined, NOW)).toBe("2026-04-09")
  })

  test("one_week_ago returns 7 days before", () => {
    expect(resolveDateSentinel("one_week_ago", undefined, NOW)).toBe("2026-04-03")
  })

  test("one_week_from_now returns 7 days after", () => {
    expect(resolveDateSentinel("one_week_from_now", undefined, NOW)).toBe("2026-04-17")
  })

  test("one_month_ago returns previous month same day", () => {
    expect(resolveDateSentinel("one_month_ago", undefined, NOW)).toBe("2026-03-10")
  })

  test("one_month_from_now returns next month same day", () => {
    expect(resolveDateSentinel("one_month_from_now", undefined, NOW)).toBe("2026-05-10")
  })

  test("custom_date returns the provided customDate", () => {
    expect(resolveDateSentinel("custom_date", "2026-06-15", NOW)).toBe("2026-06-15")
  })

  test("custom_date throws when customDate is missing", () => {
    expect(() => resolveDateSentinel("custom_date", undefined, NOW)).toThrow(
      "custom_date sentinel requires a customDate value"
    )
  })

  test("early-UTC instant before NY reset → today rolls back to previous calendar date", () => {
    const earlyMorningUtc = new Date("2026-05-07T03:00:00.000Z")
    expect(resolveDateSentinel("today", undefined, earlyMorningUtc)).toBe("2026-05-06")
  })

  test("just-after-NY-reset instant (EDT, 10:00 UTC) → today flips to new calendar day", () => {
    const atReset = new Date("2026-05-07T10:00:00.000Z")
    expect(resolveDateSentinel("today", undefined, atReset)).toBe("2026-05-07")
  })

  test("EST mid-November after reset → ESO-aligned today (post fall-back)", () => {
    const estMidNov = new Date("2026-11-15T17:00:00.000Z")
    expect(resolveDateSentinel("today", undefined, estMidNov)).toBe("2026-11-15")
  })

  test("EST early-UTC before NY reset → previous logical day", () => {
    const estBeforeReset = new Date("2026-11-15T08:00:00.000Z")
    expect(resolveDateSentinel("today", undefined, estBeforeReset)).toBe("2026-11-14")
  })

  test("EDT mid-October after reset → ESO-aligned today (still EDT, pre fall-back)", () => {
    const edtMidOct = new Date("2026-10-15T16:00:00.000Z")
    expect(resolveDateSentinel("today", undefined, edtMidOct)).toBe("2026-10-15")
  })

  test("handles month boundary using ESO-aligned today (Jan 31 minus one month)", () => {
    const jan31 = new Date("2026-01-31T17:00:00.000Z")
    expect(resolveDateSentinel("one_month_ago", undefined, jan31)).toBe("2025-12-31")
  })

  test("handles year boundary (Jan 1 yesterday)", () => {
    const jan1 = new Date("2026-01-01T17:00:00.000Z")
    expect(resolveDateSentinel("yesterday", undefined, jan1)).toBe("2025-12-31")
  })
})

describe("resolveInstantSentinel", () => {
  test("today returns start-of-day ms epoch (ESO-aligned)", () => {
    const today = resolveInstantSentinel("today", undefined, NOW)
    const tomorrow = resolveInstantSentinel("tomorrow", undefined, NOW)
    expect(typeof today).toBe("number")
    expect(typeof tomorrow).toBe("number")
    expect(tomorrow - today).toBe(86_400_000)
  })

  test("tomorrow follows today by exactly one day", () => {
    const today = resolveInstantSentinel("today", undefined, NOW)
    const tomorrow = resolveInstantSentinel("tomorrow", undefined, NOW)
    expect(tomorrow - today).toBe(86_400_000)
  })

  test("custom_date returns the provided customInstant", () => {
    expect(resolveInstantSentinel("custom_date", 1234567890, NOW)).toBe(1234567890)
  })

  test("custom_date throws when customInstant is missing", () => {
    expect(() => resolveInstantSentinel("custom_date", undefined, NOW)).toThrow(
      "custom_date sentinel requires a customInstant value"
    )
  })
})

describe("resolveRelativeToToday — half-open ranges", () => {
  describe("day", () => {
    test("this day → start = today, end = tomorrow", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "day" }, NOW)
      ).toEqual({
        start: "2026-04-10",
        end: "2026-04-11",
      })
    })

    test("past day → start = yesterday, end = today", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "past", unit: "day" }, NOW)
      ).toEqual({
        start: "2026-04-09",
        end: "2026-04-10",
      })
    })

    test("next day → start = tomorrow, end = day-after-tomorrow", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "next", unit: "day" }, NOW)
      ).toEqual({
        start: "2026-04-11",
        end: "2026-04-12",
      })
    })
  })

  describe("week (ISO, Monday start)", () => {
    test("this week → Monday to start-of-following-Monday", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "week" }, NOW)
      ).toEqual({
        start: "2026-04-06",
        end: "2026-04-13",
      })
    })

    test("past week → previous Monday to this Monday", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "past", unit: "week" }, NOW)
      ).toEqual({
        start: "2026-03-30",
        end: "2026-04-06",
      })
    })

    test("next week → next Monday to following Monday", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "next", unit: "week" }, NOW)
      ).toEqual({
        start: "2026-04-13",
        end: "2026-04-20",
      })
    })

    test("handles Sunday (last day of ISO week)", () => {
      const sunday = new Date("2026-04-12T16:00:00.000Z")
      expect(
        resolveRelativeToToday(
          { type: "relative_to_today", direction: "this", unit: "week" },
          sunday
        )
      ).toEqual({
        start: "2026-04-06",
        end: "2026-04-13",
      })
    })

    test("handles Monday (first day of ISO week)", () => {
      const monday = new Date("2026-04-06T16:00:00.000Z")
      expect(
        resolveRelativeToToday(
          { type: "relative_to_today", direction: "this", unit: "week" },
          monday
        )
      ).toEqual({
        start: "2026-04-06",
        end: "2026-04-13",
      })
    })
  })

  describe("month", () => {
    test("this month → first to start-of-next-month", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "month" }, NOW)
      ).toEqual({
        start: "2026-04-01",
        end: "2026-05-01",
      })
    })

    test("past month → first of previous month to first of this month", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "past", unit: "month" }, NOW)
      ).toEqual({
        start: "2026-03-01",
        end: "2026-04-01",
      })
    })

    test("next month → first of next month to first of following month", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "next", unit: "month" }, NOW)
      ).toEqual({
        start: "2026-05-01",
        end: "2026-06-01",
      })
    })

    test("handles February (28 days in non-leap year)", () => {
      const feb = new Date("2026-02-15T17:00:00.000Z")
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "month" }, feb)
      ).toEqual({
        start: "2026-02-01",
        end: "2026-03-01",
      })
    })

    test("handles February (29 days in leap year)", () => {
      const feb = new Date("2024-02-15T17:00:00.000Z")
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "month" }, feb)
      ).toEqual({
        start: "2024-02-01",
        end: "2024-03-01",
      })
    })
  })

  describe("year", () => {
    test("this year → Jan 1 to next Jan 1", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "this", unit: "year" }, NOW)
      ).toEqual({
        start: "2026-01-01",
        end: "2027-01-01",
      })
    })

    test("past year → previous Jan 1 to this Jan 1", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "past", unit: "year" }, NOW)
      ).toEqual({
        start: "2025-01-01",
        end: "2026-01-01",
      })
    })

    test("next year → next Jan 1 to following Jan 1", () => {
      expect(
        resolveRelativeToToday({ type: "relative_to_today", direction: "next", unit: "year" }, NOW)
      ).toEqual({
        start: "2027-01-01",
        end: "2028-01-01",
      })
    })
  })

  describe("ESO reset alignment near UTC midnight", () => {
    test("early-UTC instant (before NY reset) anchors range to previous logical day", () => {
      const earlyUtc = new Date("2026-05-07T03:00:00.000Z")
      expect(
        resolveRelativeToToday(
          { type: "relative_to_today", direction: "this", unit: "day" },
          earlyUtc
        )
      ).toEqual({
        start: "2026-05-06",
        end: "2026-05-07",
      })
    })
  })
})

describe("resolveRelativeToTodayInstant — half-open ranges", () => {
  test("this day → exactly 24h between start and end (start-of-day to start-of-next-day)", () => {
    const result = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "this", unit: "day" },
      NOW
    )
    expect(typeof result.start).toBe("number")
    expect(typeof result.end).toBe("number")
    expect(result.end - result.start).toBe(86_400_000)
  })

  test("this week → exactly 7 days between start and end", () => {
    const result = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "this", unit: "week" },
      NOW
    )
    expect(result.end - result.start).toBe(7 * 86_400_000)
  })

  test("this month (April, 30 days) → 30 days between start and end", () => {
    const result = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "this", unit: "month" },
      NOW
    )
    expect(result.end - result.start).toBe(30 * 86_400_000)
  })

  test("past day → end equals today's start-of-day (consecutive bucket boundary)", () => {
    const past = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "past", unit: "day" },
      NOW
    )
    const today = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "this", unit: "day" },
      NOW
    )
    expect(past.end).toBe(today.start)
  })

  test("next day → start equals today's end (consecutive bucket boundary)", () => {
    const next = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "next", unit: "day" },
      NOW
    )
    const today = resolveRelativeToTodayInstant(
      { type: "relative_to_today", direction: "this", unit: "day" },
      NOW
    )
    expect(next.start).toBe(today.end)
  })
})
