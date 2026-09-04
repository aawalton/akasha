import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { capitalizedDay, dayOfWeekFromDayStr } from "@akasha/exercise-access/day-of-week"
import { activeSchedule, scheduleDayFor } from "@akasha/exercise-access/exercise-finding"
import { type Row, rowsFor, textIn } from "@akasha/exercise-access/exercise-rows"
import { abandonedSessions, type Closing } from "@akasha/exercise-access/session-closing"
import { freeSlug, sessionSlugStem } from "@akasha/exercise-access/session-derive"
import { listedAt } from "@akasha/indexes"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
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

const WORKOUT_SESSION = "workout-session"

const SHAPE = { valued: [DATE, NOTES], switches: [FORCE, JSON_SAID] }

type Closed = { readonly changes: readonly FileEdit[] } | { readonly refused: string }

/**
 * The edits closing every session left open from an earlier day.
 *
 * The closing is composed here rather than written where it is worked out, so the sessions closed
 * and the session opened land in one commit: a run that closed yesterday's and then failed to open
 * today's would leave the day with no session at all.
 */
function closingEdits(root: string, closings: readonly Closing[]): Closed {
  const changes: FileEdit[] = []
  for (const one of closings) {
    const listed = listedAt(root, WORKOUT_SESSION, one.slug)
    const at = listed.length === 1 ? listed[0]?.path : undefined
    const was = at === undefined ? null : valueAt(at, root)
    if (was === null) {
      return { refused: `\`${WORKOUT_SESSION}/${one.slug}\` would not load, so it is not closed` }
    }
    const composed = composedFor(root, {
      pageTypeSlug: WORKOUT_SESSION,
      slug: one.slug,
      values: { ...was, workoutSessionCompletedAt: one.completedAt },
    })
    if ("refused" in composed) return { refused: composed.refused }
    changes.push({
      path: composed.put.path,
      body: new TextEncoder().encode(composed.put.content),
    })
  }
  return { changes }
}

export async function exerciseSessionStart(argv: readonly string[], given: Given): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const dayStr = dayIn(said, DATE, new Date())
  if (typeof dayStr === "object") return refusedBy(dayStr.refused)
  const day = dayOfWeekFromDayStr(dayStr)
  const notes = said.named[NOTES]

  const abandoned = await abandonedSessions(dayStr)
  if ("refused" in abandoned) return refusedBy([abandoned.refused], DATA)
  const closing = closingEdits(given.root, abandoned.closings)
  if ("refused" in closing) return refusedBy([closing.refused], DATA)

  const schedule = await activeSchedule()
  if ("refused" in schedule) return refusedBy([schedule.refused], DATA)
  let scheduleDay: Row | null = null
  if (schedule.row !== null && schedule.row.slug !== null) {
    const found = await scheduleDayFor(schedule.row.slug, day)
    if ("refused" in found) return refusedBy([found.refused], DATA)
    scheduleDay = found.row
  }
  const focus = scheduleDay === null ? undefined : textIn(scheduleDay, "focus")

  if (focus === REST && !said.flags.has(FORCE)) {
    return refusedBy([
      `${dayStr} (${day}) is a rest day — say \`${FORCE}\` to open a session anyway`,
    ])
  }

  const titleHead = focus !== undefined ? `${capitalizedDay(day)} ${focus}` : capitalizedDay(day)
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
  const composed = composedFor(given.root, {
    pageTypeSlug: WORKOUT_SESSION,
    slug,
    values,
  })
  if ("refused" in composed) return refusedBy([composed.refused], DATA)

  const changes: FileEdit[] = [
    ...closing.changes,
    { path: composed.put.path, body: new TextEncoder().encode(composed.put.content) },
  ]
  const landed = landingAsked(given, {
    changes,
    message: `open the session ${slug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (landed.code !== 0) return landed

  if (wantsJson(said)) {
    return asJson({
      path: composed.put.path,
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
      ["path", composed.put.path],
      ["slug", slug],
      ["focus", focus ?? "-"],
    ]),
    ...landed.report,
  ])
}
