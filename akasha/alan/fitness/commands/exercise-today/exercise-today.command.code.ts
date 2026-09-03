import type { Answer } from "@akasha/command-system/calling"
import { type DayOfWeek, dayOfWeekFromDayStr } from "@akasha/exercise-access/day-of-week"
import { type Row, rowsFor, textIn, titleOf } from "@akasha/exercise-access/exercise-rows"
import {
  activeSchedule,
  type Scheduled,
  scheduleDayOn,
} from "@akasha/exercise-access/schedule-focus"
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

const NOTHING = "-"

async function dayOfSchedule(schedule: Row | null, day: DayOfWeek): Promise<Scheduled> {
  if (schedule === null || schedule.slug === null) return { row: null }
  return scheduleDayOn(schedule.slug, day)
}

export async function exerciseToday(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)

  try {
    const day = dayOfWeekFromDayStr(dayStr)
    const scheduled = await activeSchedule()
    if ("refused" in scheduled) return refusedBy([scheduled.refused], DATA)
    const schedule = scheduled.row
    const dayFound = await dayOfSchedule(schedule, day)
    if ("refused" in dayFound) return refusedBy([dayFound.refused], DATA)
    const focus = dayFound.row === null ? undefined : textIn(dayFound.row, "focus")

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
        schedule: schedule === null ? null : { id: schedule.id, title: titleOf(schedule) },
        focus: focus ?? null,
        session:
          session !== undefined ? { id: session.id, completed, count: sessions.rows.length } : null,
      })
    }
    return told(
      rowsOf([
        ["date", dayStr],
        ["dayOfWeek", day],
        ["focus", focus ?? NOTHING],
        ["session", session !== undefined ? session.id : NOTHING],
        ["sessionCompleted", session !== undefined ? String(completed) : NOTHING],
      ])
    )
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
