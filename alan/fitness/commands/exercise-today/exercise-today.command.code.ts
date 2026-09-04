import type { Answer } from "@akasha/command-system/calling"
import { dayOfWeekFromDayStr } from "@akasha/exercise-access/day-of-week"
import { activeSchedule, scheduleDayFor } from "@akasha/exercise-access/exercise-finding"
import { type Row, rowsFor, textIn, titleOf } from "@akasha/exercise-access/exercise-rows"
import {
  asJson,
  DATA,
  dayIn,
  JSON_SAID,
  refusedBy,
  rowsOf,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const DATE = "--date"

const SHAPE = { valued: [DATE], switches: [JSON_SAID] }

const NEWEST_FIRST = 5

const WORKOUT_SESSION = "workout-session"

export async function exerciseToday(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)
  const day = dayOfWeekFromDayStr(dayStr)

  const schedule = await activeSchedule()
  if ("refused" in schedule) return refusedBy([schedule.refused], DATA)
  let scheduleDay: Row | null = null
  if (schedule.row !== null && schedule.row.slug !== null) {
    const found = await scheduleDayFor(schedule.row.slug, day)
    if ("refused" in found) return refusedBy([found.refused], DATA)
    scheduleDay = found.row
  }
  const focus = scheduleDay === null ? undefined : textIn(scheduleDay, "focus")

  const sessions = await rowsFor({
    pageTypeSlug: WORKOUT_SESSION,
    where: [{ key: "workoutSessionDate", eq: dayStr }],
    order: [{ by: "workoutSessionStartedAt", dir: "desc" }],
    limit: NEWEST_FIRST,
  })
  if ("unread" in sessions) return refusedBy([sessions.unread], DATA)
  const session = sessions.rows[0]
  const completed =
    session !== undefined && textIn(session, "workoutSessionCompletedAt") !== undefined

  if (wantsJson(said)) {
    return asJson({
      date: dayStr,
      dayOfWeek: day,
      schedule:
        schedule.row === null ? null : { id: schedule.row.id, title: titleOf(schedule.row) },
      focus: focus ?? null,
      session:
        session !== undefined ? { id: session.id, completed, count: sessions.rows.length } : null,
    })
  }
  return told(
    rowsOf([
      ["date", dayStr],
      ["dayOfWeek", day],
      ["focus", focus ?? "-"],
      ["session", session !== undefined ? session.id : "-"],
      ["sessionCompleted", session !== undefined ? String(completed) : "-"],
    ])
  )
}
