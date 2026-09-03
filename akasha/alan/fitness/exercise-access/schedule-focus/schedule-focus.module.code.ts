import type { DayOfWeek } from "../day-of-week/day-of-week.module.code.ts"
import { type Row, rowFor, rowsFor, textIn } from "../exercise-rows/exercise-rows.module.code.ts"

const WORKOUT_SCHEDULE = "workout-schedule"

const SCHEDULE_DAY = "schedule-day"

const WORKOUT_SESSION = "workout-session"

const REST = "rest"

const RECENT_SESSIONS = 6

const DAYS_AT_MOST = 50

export type Scheduled = { readonly row: Row | null } | { readonly refused: string }

export type Focused = { readonly focus: string | null } | { readonly refused: string }

export type Sessioned = { readonly rows: readonly Row[] } | { readonly refused: string }

export interface FocusRecency {
  readonly focus: string
  readonly lastTrained: string | null
}

export type Recencies =
  | { readonly recencies: readonly FocusRecency[] }
  | { readonly refused: string }

export async function activeSchedule(): Promise<Scheduled> {
  const found = await rowFor({
    pageTypeSlug: WORKOUT_SCHEDULE,
    where: [{ key: "workoutScheduleActive", eq: true }],
  })
  if ("unread" in found) return { refused: found.unread }
  return { row: found.row }
}

export async function scheduleDayOn(
  scheduleSlug: string,
  dayOfWeek: DayOfWeek
): Promise<Scheduled> {
  const found = await rowFor({
    pageTypeSlug: SCHEDULE_DAY,
    where: [
      { key: "scheduleSlug", eq: scheduleSlug },
      { key: "dayOfWeek", eq: dayOfWeek },
    ],
  })
  if ("unread" in found) return { refused: found.unread }
  return { row: found.row }
}

export function focusIn(row: Row | null): string | null {
  if (row === null) return null
  const focus = textIn(row, "focus")
  return focus === undefined || focus === REST ? null : focus
}

export async function focusOn(scheduleSlug: string, dayOfWeek: DayOfWeek): Promise<Focused> {
  const found = await scheduleDayOn(scheduleSlug, dayOfWeek)
  if ("refused" in found) return found
  return { focus: focusIn(found.row) }
}

export async function daySlugsForFocus(
  scheduleSlug: string,
  focus: string
): Promise<{ readonly slugs: readonly string[] } | { readonly refused: string }> {
  const found = await rowsFor({
    pageTypeSlug: SCHEDULE_DAY,
    where: [
      { key: "scheduleSlug", eq: scheduleSlug },
      { key: "focus", eq: focus },
    ],
    select: ["id", "slug"],
  })
  if ("unread" in found) return { refused: found.unread }
  return {
    slugs: found.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null),
  }
}

export async function recentSessionsForFocus(
  scheduleSlug: string,
  focus: string
): Promise<Sessioned> {
  const days = await daySlugsForFocus(scheduleSlug, focus)
  if ("refused" in days) return days
  if (days.slugs.length === 0) return { rows: [] }
  const found = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "scheduleDaySlug", in: days.slugs }],
    order: [{ by: "workoutSessionDate", dir: "desc" }],
    limit: RECENT_SESSIONS,
  })
  if ("unread" in found) return { refused: found.unread }
  return { rows: found.rows }
}

export function focusesIn(days: readonly Row[]): readonly string[] {
  return [
    ...new Set(
      days
        .map((row) => textIn(row, "focus"))
        .filter((focus): focus is string => focus !== undefined && focus !== REST)
    ),
  ]
}

export async function lastTrainedByFocus(scheduleSlug: string | null): Promise<Recencies> {
  if (scheduleSlug === null) return { recencies: [] }
  const days = await rowsFor({
    pageTypeSlug: SCHEDULE_DAY,
    where: [{ key: "scheduleSlug", eq: scheduleSlug }],
    select: ["id", "focus"],
    limit: DAYS_AT_MOST,
  })
  if ("unread" in days) return { refused: days.unread }
  const found: FocusRecency[] = []
  for (const focus of focusesIn(days.rows)) {
    const sessions = await recentSessionsForFocus(scheduleSlug, focus)
    if ("refused" in sessions) return sessions
    const latest = sessions.rows[0]
    found.push({
      focus,
      lastTrained: latest === undefined ? null : (textIn(latest, "workoutSessionDate") ?? null),
    })
  }
  return { recencies: found }
}
