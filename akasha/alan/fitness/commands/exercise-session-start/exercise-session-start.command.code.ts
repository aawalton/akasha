import type { Answer } from "@akasha/command-system/calling"
import { fieldStr } from "@collections/exercises/cli/fields"
import { resolveActiveSchedule, resolveScheduleDay } from "@collections/exercises/cli/resolve"
import { createPage, getPages } from "@collections/exercises/pages/access"
import type { Json } from "@collections/exercises/pages/page"
import {
  capitalizeDayOfWeek,
  dayOfWeekFromDayStr,
} from "@collections/exercises/tracking/day-of-week"
import { freeSlug, sessionSlugStem } from "@collections/exercises/tracking/derive"
import { closeAbandonedSessions } from "@collections/exercises/tracking/session-close"
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

const NOTES = "--notes"

const FORCE = "--force"

const REST = "rest"

const SHAPE = { valued: [DATE, NOTES], switches: [FORCE, JSON_SAID] }

export async function exerciseSessionStart(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)
  const day = dayOfWeekFromDayStr(dayStr)
  const notes = said.named[NOTES]

  try {
    const closed = await closeAbandonedSessions(dayStr)

    const schedule = await resolveActiveSchedule()
    const scheduleDay = schedule?.slug != null ? await resolveScheduleDay(schedule.slug, day) : null
    const focus = scheduleDay != null ? fieldStr(scheduleDay, "focus") : undefined

    if (focus === REST && !said.flags.has(FORCE)) {
      return refusedBy([
        `${dayStr} (${day}) is a rest day — say \`${FORCE}\` to open a session anyway`,
      ])
    }

    const titleHead =
      focus !== undefined ? `${capitalizeDayOfWeek(day)} ${focus}` : capitalizeDayOfWeek(day)
    const title = `${titleHead} — ${dayStr}`

    const sameDay = await getPages({
      pageTypeSlug: "workout-session",
      where: [{ key: "date", eq: dayStr }],
      select: ["id", "slug"],
    })
    const taken = new Set(
      sameDay.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
    )
    const slug = freeSlug(sessionSlugStem(day, focus, dayStr), taken)

    const properties: Record<string, Json> = {
      title,
      slug,
      date: dayStr,
      startedAt: new Date().toISOString(),
      ...(scheduleDay?.slug != null ? { scheduleDaySlug: scheduleDay.slug } : {}),
      ...(notes !== undefined ? { notes } : {}),
    }
    const session = await createPage("workout-session", slug, properties)

    if (wantsJson(said)) {
      return asJson({
        id: session.id,
        slug,
        title,
        date: dayStr,
        dayOfWeek: day,
        focus: focus ?? null,
        closedAbandoned: closed,
      })
    }
    return told([
      ...closed.map((one) => `closed-abandoned\t${one.title}\t${one.completedAt}`),
      ...rowsOf([
        ["id", slug],
        ["focus", focus ?? "-"],
      ]),
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
