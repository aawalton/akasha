import { landingAsked, wroteAndTook } from "@akasha/command-system/asking"
import type { Answer, Given } from "@akasha/command-system/calling"
import type { FileEdit } from "@akasha/command-system/landing"
import { capitalizedDay, DAYS_OF_WEEK_MONDAY_FIRST } from "@akasha/exercise-access/day-of-week"
import { rowsFor } from "@akasha/exercise-access/exercise-rows"
import { SCHEDULE_DAY_FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { freeSlug, scheduleDaySlug } from "@akasha/exercise-access/session-derive"
import { listedAt } from "@akasha/indexes"
import { pageStem } from "@akasha/named-for/page-stem"
import { type Value, valueAt } from "@akasha/pages-system/page-value"
import { composedFor } from "@akasha/pages-system-service/composing"
import {
  asJson,
  DATA,
  JSON_SAID,
  refusedBy,
  told,
  wantsJson,
  wordsIn,
} from "../exercise-saying/exercise-saying.module.code.ts"

const TITLE = "--title"

const DESCRIPTION = "--description"

const DEFAULT_TITLE = "Weekly Schedule"

const WORKOUT_SCHEDULE = "workout-schedule"

const SCHEDULE_DAY = "schedule-day"

const DAY_FLAGS = DAYS_OF_WEEK_MONDAY_FIRST.map((day) => `--${day}`)

const SHAPE = { valued: [TITLE, DESCRIPTION, ...DAY_FLAGS], switches: [JSON_SAID] }

const FOCUS_CHOICES: readonly string[] = SCHEDULE_DAY_FOCUS_OPTIONS

export type DayFocus = { readonly day: string; readonly focus: string; readonly slug: string }

export function focusByDay(
  named: Readonly<Record<string, string>>
): ReadonlyMap<string, string> | { readonly refused: readonly string[] } {
  const found = new Map<string, string>()
  const refusals: string[] = []
  for (const day of DAYS_OF_WEEK_MONDAY_FIRST) {
    const flag = `--${day}`
    const said = named[flag]
    if (said === undefined) {
      refusals.push(`\`${flag}\` says what ${capitalizedDay(day)} trains, and none is named`)
      continue
    }
    const focus = said.trim().toLowerCase()
    if (!FOCUS_CHOICES.includes(focus)) {
      refusals.push(
        `\`${flag}\` takes one of \`${FOCUS_CHOICES.join("`, `")}\`, and this call names \`${said}\``
      )
      continue
    }
    found.set(day, focus)
  }
  if (refusals.length > 0) return { refused: refusals }
  return found
}

type Stood = { readonly changes: readonly FileEdit[] } | { readonly refused: string }

/**
 * The edits standing every other schedule down.
 *
 * Exactly one schedule is the active one, so the schedules already active are stood down in the
 * same commit the new one is raised in rather than in a commit before it.
 */
function stoodDown(root: string, slugs: readonly string[]): Stood {
  const changes: FileEdit[] = []
  for (const slug of slugs) {
    const listed = listedAt(root, WORKOUT_SCHEDULE, slug)
    const at = listed.length === 1 ? listed[0]?.path : undefined
    const was = at === undefined ? null : valueAt(at, root)
    if (was === null) {
      return { refused: `\`${WORKOUT_SCHEDULE}/${slug}\` would not load, so it is not stood down` }
    }
    const composed = composedFor(root, {
      pageTypeSlug: WORKOUT_SCHEDULE,
      slug,
      values: { ...was, workoutScheduleActive: false },
    })
    if ("refused" in composed) return { refused: composed.refused }
    changes.push({
      path: composed.put.path,
      body: new TextEncoder().encode(composed.put.content),
    })
  }
  return { changes }
}

export async function exerciseScheduleCreate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const title = said.named[TITLE] ?? DEFAULT_TITLE
  const description = said.named[DESCRIPTION]
  const focuses = focusByDay(said.named)
  if ("refused" in focuses) return refusedBy(focuses.refused)

  const standing = await rowsFor({ pageTypeSlug: WORKOUT_SCHEDULE, select: ["id", "slug"] })
  if ("unread" in standing) return refusedBy([standing.unread], DATA)
  const active = await rowsFor({
    pageTypeSlug: WORKOUT_SCHEDULE,
    where: [{ key: "workoutScheduleActive", eq: true }],
    select: ["id", "slug"],
  })
  if ("unread" in active) return refusedBy([active.unread], DATA)

  const stood = stoodDown(
    given.root,
    active.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
  )
  if ("refused" in stood) return refusedBy([stood.refused], DATA)

  const taken = new Set(
    standing.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
  )
  const scheduleSlug = freeSlug(pageStem(title), taken)

  const scheduleValues: Value = {
    title,
    workoutScheduleActive: true,
    ...(description !== undefined ? { workoutScheduleDescription: description } : {}),
  }
  const schedule = composedFor(given.root, {
    pageTypeSlug: WORKOUT_SCHEDULE,
    slug: scheduleSlug,
    values: scheduleValues,
  })
  if ("refused" in schedule) return refusedBy([schedule.refused], DATA)

  const changes: FileEdit[] = [
    ...stood.changes,
    { path: schedule.put.path, body: new TextEncoder().encode(schedule.put.content) },
  ]
  const days: DayFocus[] = []
  for (const day of DAYS_OF_WEEK_MONDAY_FIRST) {
    const focus = focuses.get(day)
    if (focus === undefined) continue
    const daySlug = scheduleDaySlug(scheduleSlug, day)
    const composed = composedFor(given.root, {
      pageTypeSlug: SCHEDULE_DAY,
      slug: daySlug,
      values: {
        title: `${capitalizedDay(day)} — ${focus}`,
        scheduleSlug,
        dayOfWeek: day,
        focus,
      },
    })
    if ("refused" in composed) return refusedBy([composed.refused], DATA)
    changes.push({
      path: composed.put.path,
      body: new TextEncoder().encode(composed.put.content),
    })
    days.push({ day, focus, slug: daySlug })
  }

  const landed = await landingAsked(given, {
    changes,
    message: `raise the schedule ${scheduleSlug}`,
    dryRun: false,
    glass: null,
    unmoved: [],
    saying: wroteAndTook,
  })
  if (landed.code !== 0) return landed

  if (wantsJson(said)) return asJson({ slug: scheduleSlug, title, days })
  return told([
    `slug\t${scheduleSlug}`,
    ...days.map((one) => `day\t${one.day}\t${one.focus}\t${one.slug}`),
    ...landed.report,
  ])
}
