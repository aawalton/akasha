import type { Answer, Given } from "@akasha/command-system/calling"
import {
  capitalizeDayOfWeek,
  type DayOfWeek,
  dayOfWeekFromDayStr,
} from "@akasha/exercise-access/day-of-week"
import { type Row, rowsFor, textIn } from "@akasha/exercise-access/exercise-rows"
import {
  activeSchedule,
  type Scheduled,
  scheduleDayOn,
} from "@akasha/exercise-access/schedule-focus"
import { abandonedSessions, type Closing } from "@akasha/exercise-access/session-closing"
import { freeSlug, sessionSlugStem } from "@akasha/exercise-access/session-derive"
import type { Value } from "@akasha/pages-system/page-value"
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
import {
  editsFor,
  landed,
  standingAt,
  type Writing,
} from "../exercise-writing/exercise-writing.module.code.ts"

const DATE = "--date"

const NOTES = "--notes"

const FORCE = "--force"

const REST = "rest"

const SHAPE = { valued: [DATE, NOTES], switches: [FORCE, JSON_SAID] }

const WORKOUT_SESSION = "workout-session"

const NOTHING = "-"

async function dayOfSchedule(schedule: Row | null, day: DayOfWeek): Promise<Scheduled> {
  if (schedule === null || schedule.slug === null) return { row: null }
  return scheduleDayOn(schedule.slug, day)
}

function closingWritings(
  root: string,
  closings: readonly Closing[]
): { readonly writings: readonly Writing[] } | { readonly refused: string } {
  const writings: Writing[] = []
  for (const one of closings) {
    const was = standingAt(root, WORKOUT_SESSION, one.slug)
    if ("refused" in was) return was
    if (was.values === null) continue
    writings.push({
      pageTypeSlug: WORKOUT_SESSION,
      slug: one.slug,
      values: { ...was.values, workoutSessionCompletedAt: one.completedAt },
    })
  }
  return { writings }
}

export async function exerciseSessionStart(argv: readonly string[], given: Given): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)
  const notes = said.named[NOTES]

  try {
    const day = dayOfWeekFromDayStr(dayStr)
    const abandoned = await abandonedSessions(dayStr)
    if ("refused" in abandoned) return refusedBy([abandoned.refused], DATA)

    const scheduled = await activeSchedule()
    if ("refused" in scheduled) return refusedBy([scheduled.refused], DATA)
    const dayFound = await dayOfSchedule(scheduled.row, day)
    if ("refused" in dayFound) return refusedBy([dayFound.refused], DATA)
    const scheduleDay = dayFound.row
    const focus = scheduleDay === null ? undefined : textIn(scheduleDay, "focus")

    if (focus === REST && !said.flags.has(FORCE)) {
      return refusedBy([
        `${dayStr} (${day}) is a rest day — say \`${FORCE}\` to open a session anyway`,
      ])
    }

    const titleHead =
      focus !== undefined ? `${capitalizeDayOfWeek(day)} ${focus}` : capitalizeDayOfWeek(day)
    const title = `${titleHead} — ${dayStr}`

    const sameDay = await rowsFor({
      pageTypeSlug: WORKOUT_SESSION,
      where: [{ key: "workoutSessionDate", eq: dayStr }],
      select: ["id", "slug"],
    })
    if ("unread" in sameDay) return refusedBy([sameDay.unread], DATA)
    const taken = new Set(
      sameDay.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
    )
    const slug = freeSlug(sessionSlugStem(day, focus, dayStr), taken)

    const values: Value = {
      title,
      workoutSessionDate: dayStr,
      workoutSessionStartedAt: new Date().toISOString(),
      ...(scheduleDay?.slug != null ? { scheduleDaySlug: scheduleDay.slug } : {}),
      ...(notes !== undefined ? { notes } : {}),
    }

    const closings = closingWritings(given.root, abandoned.closings)
    if ("refused" in closings) return refusedBy([closings.refused], DATA)
    const edits = editsFor(given.root, [
      ...closings.writings,
      { pageTypeSlug: WORKOUT_SESSION, slug, values },
    ])
    if ("refused" in edits) return refusedBy([edits.refused], DATA)
    const answer = landed(given, edits.changes, `open the session ${slug}`)
    if (answer.code !== 0) return answer

    if (wantsJson(said)) {
      return asJson({
        slug,
        title,
        date: dayStr,
        dayOfWeek: day,
        focus: focus ?? null,
        closedAbandoned: abandoned.closings,
      })
    }
    return told([
      ...abandoned.closings.map((one) => `closed-abandoned\t${one.title}\t${one.completedAt}`),
      ...rowsOf([
        ["id", slug],
        ["focus", focus ?? NOTHING],
      ]),
      ...answer.report,
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
