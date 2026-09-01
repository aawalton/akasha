import { getEsoDayStr, getEsoDayStrOffset } from "@akasha/day/eso-day"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { PageWhere } from "../page-types/page-types.module.code.ts"

export const SNAPSHOT_SLUG_BY_TASK_SLUG: Readonly<Record<string, string>> = {
  task: "completed-task",
  "temper-task": "temper-completed-task",
}

export interface CompletionDecision {
  readonly completedAt: number
  readonly deleteSource: boolean
}

function hasRecurrence(rrule: unknown): boolean {
  if (typeof rrule === "string") return rrule.length > 0
  if (rrule !== null && typeof rrule === "object") {
    const rule = Reflect.get(rrule, "rule")
    return typeof rule === "string" && rule.length > 0
  }
  return false
}

export function decideCompletion(args: {
  rrule: unknown
  completedAtMs: number
}): CompletionDecision {
  return {
    completedAt: args.completedAtMs,
    deleteSource: !hasRecurrence(args.rrule),
  }
}

const CALENDAR_DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export function computeRescheduleDate(args: {
  to?: string
  byDays?: number
  nowMs: number
}): string {
  const hasTo = args.to !== undefined
  const hasBy = args.byDays !== undefined
  if (hasTo === hasBy) {
    throw new Error("reschedule requires exactly one of `to` or `byDays`")
  }
  const now = new Date(args.nowMs)
  if (hasBy) {
    const n = args.byDays
    if (n === undefined || !Number.isInteger(n)) {
      throw new Error(`reschedule \`byDays\` must be an integer, got ${String(n)}`)
    }
    return getEsoDayStrOffset(now, n)
  }
  const to = args.to ?? ""
  if (to === "today") return getEsoDayStr(now)
  if (to === "tomorrow") return getEsoDayStrOffset(now, 1)
  if (CALENDAR_DATE_RE.test(to)) return to
  throw new Error(
    `reschedule \`to\` must be a YYYY-MM-DD date, "today", or "tomorrow", got "${to}"`
  )
}

export type DueSelector = "today" | "overdue" | "due-or-overdue" | "upcoming"

export const DUE_SELECTORS: readonly DueSelector[] = [
  "today",
  "overdue",
  "due-or-overdue",
  "upcoming",
]

export function dueSelectorCondition(selector: DueSelector, todayEsoStr: string): PageWhere {
  const completedNull = { key: "completedAt", isNull: true } as const
  switch (selector) {
    case "today":
      return [{ key: "dueDate", eq: todayEsoStr }, completedNull]
    case "overdue":
      return [{ key: "dueDate", lt: todayEsoStr }, completedNull]
    case "due-or-overdue":
      return [{ key: "dueDate", lte: todayEsoStr }, completedNull]
    case "upcoming":
      return [{ key: "dueDate", gt: todayEsoStr }, completedNull]
    default:
      return assertNever(selector)
  }
}

export function dueSelectorConditionForNow(selector: DueSelector, nowMs: number): PageWhere {
  return dueSelectorCondition(selector, getEsoDayStr(new Date(nowMs)))
}

export function parseDueSelector(value: string): DueSelector | undefined {
  return DUE_SELECTORS.find((s) => s === value)
}
