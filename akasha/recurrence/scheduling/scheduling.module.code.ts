import { padTwo } from "@akasha/digit-padding"
import { RRule } from "rrule"
import type { RecurrenceDueResult, RecurrenceTask } from "../shape/recurrence-shape.module.code.ts"

function toEpoch(date: string, time: string | null): number {
  const t = time != null && time !== "" ? time : "00:00"
  return new Date(`${date}T${t}:00Z`).getTime()
}

function utcDateString(d: Date): string {
  return `${d.getUTCFullYear()}-${padTwo(d.getUTCMonth() + 1)}-${padTwo(d.getUTCDate())}`
}

export function advanceRecurrenceDueDate(
  task: RecurrenceTask,
  now: Date,
  getResetTime: (now: Date) => Date
): RecurrenceDueResult | null {
  if (task.rrule == null) return null

  const time = task.dueTime ?? null
  const currentDueEpoch = task.dueDate != null ? toEpoch(task.dueDate, time) : null

  const resetNow = getResetTime(now)
  const anchor = currentDueEpoch != null ? new Date(currentDueEpoch) : resetNow

  const endOfTodayLogical = new Date(
    Date.UTC(
      resetNow.getUTCFullYear(),
      resetNow.getUTCMonth(),
      resetNow.getUTCDate(),
      23,
      59,
      59,
      999
    )
  )

  const next = getNextCalendarOccurrence(task.rrule, anchor, endOfTodayLogical)
  if (next == null) return null
  return { dueDate: utcDateString(next), dueTime: time }
}

function getNextCalendarOccurrence(rruleStr: string, dtstart: Date, floor: Date): Date | null {
  const rule = RRule.fromString(`DTSTART:${formatRruleDate(dtstart)}\n${rruleStr}`)
  const after = new Date(Math.max(dtstart.getTime(), floor.getTime()) + 1)
  return rule.after(after, true) ?? null
}

export function getOccurrenceAtOrAfter(rruleStr: string, from: string): string | null {
  const stripped = rruleStr.startsWith("RRULE:") ? rruleStr.slice(6) : rruleStr
  const fromEpoch = toEpoch(from, null)
  const fromDate = new Date(fromEpoch)
  const rule = RRule.fromString(`DTSTART:${formatRruleDate(fromDate)}\n${stripped}`)
  const next = rule.after(fromDate, true) ?? null
  if (next == null) return null
  return utcDateString(next)
}

function formatRruleDate(d: Date): string {
  return `${d.getUTCFullYear()}${padTwo(d.getUTCMonth() + 1)}${padTwo(d.getUTCDate())}T${padTwo(d.getUTCHours())}${padTwo(d.getUTCMinutes())}${padTwo(d.getUTCSeconds())}Z`
}
