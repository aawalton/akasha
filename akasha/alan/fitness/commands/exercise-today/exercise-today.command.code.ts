import type { Answer } from "@akasha/command-system/calling"
import { displayTitle, fieldStr } from "@collections/exercises/cli/fields"
import { resolveActiveSchedule, resolveScheduleDay } from "@collections/exercises/cli/resolve"
import { getPages } from "@collections/exercises/pages/access"
import { dayOfWeekFromDayStr } from "@collections/exercises/tracking/day-of-week"
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

export async function exerciseToday(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)
  const day = dayOfWeekFromDayStr(dayStr)

  try {
    const schedule = await resolveActiveSchedule()
    const scheduleDay = schedule?.slug != null ? await resolveScheduleDay(schedule.slug, day) : null
    const focus = scheduleDay != null ? fieldStr(scheduleDay, "focus") : undefined

    const sessions = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "date", eq: dayStr }],
      order: [{ by: "startedAt", dir: "desc" }],
      limit: NEWEST_FIRST,
    })
    const session = sessions.rows[0]
    const completed = session !== undefined && fieldStr(session, "completedAt") !== undefined

    if (wantsJson(said)) {
      return asJson({
        date: dayStr,
        dayOfWeek: day,
        schedule: schedule != null ? { id: schedule.id, title: displayTitle(schedule) } : null,
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
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
