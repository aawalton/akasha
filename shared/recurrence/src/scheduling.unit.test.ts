import { describe, expect, it } from "bun:test"
import { getEsoResetTime } from "../../../day/day"
import { advanceRecurrenceDueDate, getOccurrenceAtOrAfter } from "./scheduling"
import type { RecurrenceTask } from "./types"

function getResetTime(now: Date): Date {
  const reset = new Date(now)
  reset.setHours(4, 0, 0, 0)
  return reset
}

function makeTask(overrides: Partial<RecurrenceTask> = {}): RecurrenceTask {
  const base: RecurrenceTask = {
    rrule: "FREQ=DAILY",
    dueDate: null,
    dueTime: null,
  }
  return { ...base, ...overrides }
}

describe("advanceRecurrenceDueDate", () => {
  it("daily task due today advances to tomorrow", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task = makeTask({ dueDate: "2026-03-05" })
    const result = advanceRecurrenceDueDate(task, now, getResetTime)
    expect(result).toEqual({ dueDate: "2026-03-06", dueTime: null })
  })

  it("daily task with future due date still advances past it", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task = makeTask({ dueDate: "2026-03-06" })
    const result = advanceRecurrenceDueDate(task, now, getResetTime)
    expect(result).toEqual({ dueDate: "2026-03-07", dueTime: null })
  })

  it("weekly task due today advances by 7 days", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task = makeTask({ rrule: "FREQ=WEEKLY", dueDate: "2026-03-05" })
    const result = advanceRecurrenceDueDate(task, now, getResetTime)
    expect(result).toEqual({ dueDate: "2026-03-12", dueTime: null })
  })

  it("returns null for one-off tasks", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task = makeTask({ rrule: null })
    const result = advanceRecurrenceDueDate(task, now, getResetTime)
    expect(result).toBeNull()
  })

  it("repeated advancement: two completions advance twice", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task1 = makeTask({ dueDate: "2026-03-05" })
    const result1 = advanceRecurrenceDueDate(task1, now, getResetTime)
    expect(result1).toEqual({ dueDate: "2026-03-06", dueTime: null })
    if (result1 === null) throw new Error("result1 unexpectedly null")

    const task2 = makeTask({ dueDate: result1.dueDate, dueTime: result1.dueTime })
    const result2 = advanceRecurrenceDueDate(task2, now, getResetTime)
    expect(result2).toEqual({ dueDate: "2026-03-07", dueTime: null })
  })

  describe("fast-forward past today's reset boundary", () => {
    it("daily task overdue by 3 days lands strictly after today's reset", () => {
      const now = new Date("2026-03-05T10:00:00")
      const task = makeTask({ rrule: "FREQ=DAILY", dueDate: "2026-03-01" })
      const result = advanceRecurrenceDueDate(task, now, getResetTime)
      expect(result).toEqual({ dueDate: "2026-03-06", dueTime: null })
    })

    it("weekly task with BYDAY preserves weekday phase when overdue", () => {
      const now = new Date("2026-03-04T10:00:00")
      const task = makeTask({
        rrule: "FREQ=WEEKLY;BYDAY=TU",
        dueDate: "2026-02-10",
      })
      const result = advanceRecurrenceDueDate(task, now, getResetTime)
      expect(result).toEqual({ dueDate: "2026-03-10", dueTime: null })
    })

    it("monthly task overdue lands on the same day-of-month in a future month", () => {
      const now = new Date("2026-03-04T10:00:00")
      const task = makeTask({
        rrule: "FREQ=MONTHLY",
        dueDate: "2026-01-15",
      })
      const result = advanceRecurrenceDueDate(task, now, getResetTime)
      expect(result).toEqual({ dueDate: "2026-03-15", dueTime: null })
    })

    it("overdue daily preserves dueTime", () => {
      const now = new Date("2026-03-05T10:00:00")
      const task = makeTask({ dueDate: "2026-03-01", dueTime: "09:00" })
      const result = advanceRecurrenceDueDate(task, now, getResetTime)
      if (result === null) throw new Error("result unexpectedly null")
      expect(result.dueDate).toBe("2026-03-06")
      expect(result.dueTime).toBe("09:00")
    })
  })

  describe("logical-day floor (reset diverges from now's UTC date)", () => {
    function getResetTime10UTC(now: Date): Date {
      const y = now.getUTCFullYear()
      const m = now.getUTCMonth()
      const d = now.getUTCDate()
      const todayResetMs = Date.UTC(y, m, d, 10, 0, 0, 0)
      if (now.getTime() >= todayResetMs) return new Date(todayResetMs)
      return new Date(todayResetMs - 86_400_000)
    }

    it("daily task: now after UTC midnight but before logical reset advances to logical tomorrow", () => {
      const now = new Date("2026-03-05T01:00:00Z")
      const task = makeTask({ rrule: "FREQ=DAILY", dueDate: "2026-03-04" })
      const result = advanceRecurrenceDueDate(task, now, getResetTime10UTC)
      expect(result).toEqual({ dueDate: "2026-03-05", dueTime: null })
    })

    it("daily task: now after logical reset still advances by one logical day", () => {
      const now = new Date("2026-03-05T15:00:00Z")
      const task = makeTask({ rrule: "FREQ=DAILY", dueDate: "2026-03-04" })
      const result = advanceRecurrenceDueDate(task, now, getResetTime10UTC)
      expect(result).toEqual({ dueDate: "2026-03-06", dueTime: null })
    })
  })

  describe("completion anchor: UTC date vs ESO logical day", () => {
    const now = new Date("2026-06-20T02:36:15.129Z")

    it("raw UTC-date anchor advances a logical day too far (the bug)", () => {
      const task = makeTask({ rrule: "FREQ=DAILY", dueDate: "2026-06-20", dueTime: "02:36" })
      const result = advanceRecurrenceDueDate(task, now, getEsoResetTime)
      expect(result).toEqual({ dueDate: "2026-06-21", dueTime: "02:36" })
    })

    it("ESO-logical-day anchor lands on the correct next day (the fix)", () => {
      const task = makeTask({ rrule: "FREQ=DAILY", dueDate: "2026-06-19", dueTime: null })
      const result = advanceRecurrenceDueDate(task, now, getEsoResetTime)
      expect(result).toEqual({ dueDate: "2026-06-20", dueTime: null })
    })
  })

  it("advance preserves dueTime", () => {
    const now = new Date("2026-03-05T10:00:00")
    const task = makeTask({ dueDate: "2026-03-05", dueTime: "09:00" })
    const result = advanceRecurrenceDueDate(task, now, getResetTime)
    if (result === null) throw new Error("result unexpectedly null")
    expect(result.dueDate).toBe("2026-03-06")
    expect(result.dueTime).toBe("09:00")
  })
})

describe("TZ purity (UTC-internal arithmetic)", () => {
  const utcResetTime = (n: Date) =>
    new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate(), 4, 0, 0))

  it("daily advance preserves dueTime regardless of process.env.TZ", () => {
    const now = new Date(Date.UTC(2026, 2, 4, 12, 0))
    const task = makeTask({ dueDate: "2026-03-01", dueTime: "02:30" })
    const result = advanceRecurrenceDueDate(task, now, utcResetTime)
    if (result === null) throw new Error("result unexpectedly null")
    expect(result.dueDate).toBe("2026-03-05")
    expect(result.dueTime).toBe("02:30")
  })
})

describe("getOccurrenceAtOrAfter", () => {
  it("returns the input date unchanged when it is itself a valid occurrence (daily)", () => {
    expect(getOccurrenceAtOrAfter("FREQ=DAILY", "2026-05-15")).toBe("2026-05-15")
  })

  it("returns the input date unchanged for a weekly Monday rrule on a Monday", () => {
    expect(getOccurrenceAtOrAfter("FREQ=WEEKLY;BYDAY=MO", "2026-05-04")).toBe("2026-05-04")
  })

  it("advances to the next Monday when the input is a Tuesday", () => {
    expect(getOccurrenceAtOrAfter("FREQ=WEEKLY;BYDAY=MO", "2026-05-05")).toBe("2026-05-11")
  })

  it("picks the closest matching weekday in a multi-day weekly rule", () => {
    expect(getOccurrenceAtOrAfter("FREQ=WEEKLY;BYDAY=MO,WE,FR", "2026-05-05")).toBe("2026-05-06")
  })

  it("returns the same monthly date when the input matches BYMONTHDAY", () => {
    expect(getOccurrenceAtOrAfter("FREQ=MONTHLY;BYMONTHDAY=15", "2026-05-15")).toBe("2026-05-15")
  })

  it("advances to the next month for a monthly rule when the input is past the day-of-month", () => {
    expect(getOccurrenceAtOrAfter("FREQ=MONTHLY;BYMONTHDAY=15", "2026-05-16")).toBe("2026-06-15")
  })

  it("advances forward in the same month when the input precedes BYMONTHDAY", () => {
    expect(getOccurrenceAtOrAfter("FREQ=MONTHLY;BYMONTHDAY=15", "2026-05-10")).toBe("2026-05-15")
  })

  it("accepts an rrule string that includes the RRULE: prefix", () => {
    expect(getOccurrenceAtOrAfter("RRULE:FREQ=DAILY", "2026-05-15")).toBe("2026-05-15")
  })
})
