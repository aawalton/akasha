import { describe, expect, it } from "bun:test"
import { parseDateExpression } from "./date-parser"

const REF = new Date("2025-03-05T18:00:00Z")

describe("parseDateExpression", () => {
  describe("basic keywords", () => {
    it("parses 'today'", () => {
      const result = parseDateExpression("today", REF)
      expect(result).toEqual({ date: "2025-03-05", matchedText: "today" })
    })

    it("parses 'tod' shorthand", () => {
      const result = parseDateExpression("tod", REF)
      expect(result).toEqual({ date: "2025-03-05", matchedText: "tod" })
    })

    it("parses 'tomorrow'", () => {
      const result = parseDateExpression("tomorrow", REF)
      expect(result).toEqual({ date: "2025-03-06", matchedText: "tomorrow" })
    })

    it("parses 'tom' shorthand", () => {
      const result = parseDateExpression("tom", REF)
      expect(result).toEqual({ date: "2025-03-06", matchedText: "tom" })
    })

    it("parses 'next week' as next Monday", () => {
      const result = parseDateExpression("next week", REF)
      expect(result).toEqual({ date: "2025-03-10", matchedText: "next week" })
    })

    it("parses 'next month' as 1st of next month", () => {
      const result = parseDateExpression("next month", REF)
      expect(result).toEqual({ date: "2025-04-01", matchedText: "next month" })
    })

    it("parses 'next year' as Jan 1 of next year", () => {
      const result = parseDateExpression("next year", REF)
      expect(result).toEqual({ date: "2026-01-01", matchedText: "next year" })
    })

    it("parses 'end of month'", () => {
      const result = parseDateExpression("end of month", REF)
      expect(result).toEqual({ date: "2025-03-31", matchedText: "end of month" })
    })

    it("parses 'no date'", () => {
      const result = parseDateExpression("no date", REF)
      expect(result).toEqual({ matchedText: "no date" })
    })

    it("parses 'someday'", () => {
      const result = parseDateExpression("someday", REF)
      expect(result).toEqual({ matchedText: "someday" })
    })

    it("parses 'later this week'", () => {
      const result = parseDateExpression("later this week", REF)
      expect(result).toEqual({ date: "2025-03-06", matchedText: "later this week" })
    })

    it("parses 'this weekend' as Saturday", () => {
      const result = parseDateExpression("this weekend", REF)
      expect(result).toEqual({ date: "2025-03-08", matchedText: "this weekend" })
    })

    it("parses 'next weekend' as Saturday of next week", () => {
      const result = parseDateExpression("next weekend", REF)
      expect(result).toEqual({ date: "2025-03-15", matchedText: "next weekend" })
    })
  })

  describe("next weekday", () => {
    it("parses 'next monday'", () => {
      const result = parseDateExpression("next monday", REF)
      expect(result?.date).toBe("2025-03-10")
    })

    it("parses 'next fri'", () => {
      const result = parseDateExpression("next fri", REF)
      expect(result?.date).toBe("2025-03-07")
    })

    it("parses 'next wednesday' (same day) as next week", () => {
      const result = parseDateExpression("next wednesday", REF)
      expect(result?.date).toBe("2025-03-12")
    })
  })

  describe("day names (chrono)", () => {
    it("parses 'monday'", () => {
      const result = parseDateExpression("monday", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBeDefined()
    })

    it("parses 'friday'", () => {
      const result = parseDateExpression("friday", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-07")
    })
  })

  describe("specific dates", () => {
    it("parses 'jan 27'", () => {
      const result = parseDateExpression("jan 27", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toMatch(/\d{4}-01-27/)
    })

    it("parses '27 jan'", () => {
      const result = parseDateExpression("27 jan", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toMatch(/\d{4}-01-27/)
    })

    it("parses '01/27/2023'", () => {
      const result = parseDateExpression("01/27/2023", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2023-01-27")
    })

    it("parses '2023-01-27' ISO format", () => {
      const result = parseDateExpression("2023-01-27", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2023-01-27")
    })

    it("parses 'mid January'", () => {
      const result = parseDateExpression("mid January", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toMatch(/\d{4}-01-15/)
    })
  })

  describe("with time", () => {
    it("parses 'today at 10'", () => {
      const result = parseDateExpression("today at 10", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-05")
      expect(result?.time).toBe("10:00")
    })

    it("parses 'tomorrow at 16:00'", () => {
      const result = parseDateExpression("tomorrow at 16:00", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-06")
      expect(result?.time).toBe("16:00")
    })

    it("parses 'Fri @ 7pm'", () => {
      const result = parseDateExpression("Fri @ 7pm", REF)
      expect(result).not.toBeNull()
      expect(result?.time).toBe("19:00")
    })

    it("parses '6pm' as today at 6pm", () => {
      const result = parseDateExpression("6pm", REF)
      expect(result).not.toBeNull()
      expect(result?.time).toBe("18:00")
    })
  })

  describe("time of day keywords", () => {
    it("parses 'tomorrow morning' as 9am", () => {
      const result = parseDateExpression("tomorrow morning", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-06")
      expect(result?.time).toBe("09:00")
    })

    it("parses 'today afternoon' as 12pm", () => {
      const result = parseDateExpression("today afternoon", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-05")
      expect(result?.time).toBe("12:00")
    })

    it("parses 'evening' as today at 7pm", () => {
      const result = parseDateExpression("evening", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-05")
      expect(result?.time).toBe("19:00")
    })
  })

  describe("relative expressions", () => {
    it("parses 'in 5 days'", () => {
      const result = parseDateExpression("in 5 days", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-10")
    })

    it("parses '+5 days'", () => {
      const result = parseDateExpression("+5 days", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-10")
    })

    it("parses 'in 3 weeks'", () => {
      const result = parseDateExpression("in 3 weeks", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-26")
    })

    it("parses 'in 2 hours'", () => {
      const result = parseDateExpression("in 2 hours", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-05")
      expect(result?.time).toBe("20:00")
    })
  })

  describe("offset expressions", () => {
    it("parses '50 days before new year's eve'", () => {
      const result = parseDateExpression("50 days before new year's eve", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-11-11")
    })

    it("parses '6 weeks before 21 Jul'", () => {
      const result = parseDateExpression("6 weeks before 21 Jul", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-06-09")
    })
  })

  describe("recurring expressions (without callback)", () => {
    it("returns null for 'every day' without parseRecurring callback", () => {
      const result = parseDateExpression("every day", REF)
      expect(result).toBeNull()
    })
  })

  describe("edge cases", () => {
    it("returns null for empty string", () => {
      expect(parseDateExpression("", REF)).toBeNull()
    })

    it("returns null for whitespace", () => {
      expect(parseDateExpression("   ", REF)).toBeNull()
    })

    it("returns null for unrecognized text", () => {
      expect(parseDateExpression("gibberish xyz", REF)).toBeNull()
    })

    it("trims whitespace from input", () => {
      const result = parseDateExpression("  today  ", REF)
      expect(result).not.toBeNull()
      expect(result?.date).toBe("2025-03-05")
    })

    it("includes matchedText on all results", () => {
      const result = parseDateExpression("tomorrow", REF)
      expect(result?.matchedText).toBe("tomorrow")
    })
  })

  describe("ESO NA day boundary (pre-reset)", () => {
    const PRE_RESET = new Date("2026-07-15T08:00:00Z")

    it("'today' returns the ESO day, not the UTC day", () => {
      expect(parseDateExpression("today", PRE_RESET)?.date).toBe("2026-07-14")
    })

    it("'tomorrow' is one ESO day after the ESO 'today'", () => {
      expect(parseDateExpression("tomorrow", PRE_RESET)?.date).toBe("2026-07-15")
    })

    it("'next monday' is computed from the ESO day-of-week (Tue → next Mon)", () => {
      expect(parseDateExpression("next monday", PRE_RESET)?.date).toBe("2026-07-20")
    })

    it("'+3d' shorthand offsets from the ESO day, not the UTC day", () => {
      expect(parseDateExpression("+3d", PRE_RESET)?.date).toBe("2026-07-17")
    })

    it("'next week' is the Monday after the ESO 'today'", () => {
      expect(parseDateExpression("next week", PRE_RESET)?.date).toBe("2026-07-20")
    })

    it("'end of month' uses the ESO day's month", () => {
      expect(parseDateExpression("end of month", PRE_RESET)?.date).toBe("2026-07-31")
    })
  })
})
