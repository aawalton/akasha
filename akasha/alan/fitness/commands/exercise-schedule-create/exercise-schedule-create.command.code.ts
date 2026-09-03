import type { Answer, Given } from "@akasha/command-system/calling"
import { capitalizeDayOfWeek, DAYS_OF_WEEK_MONDAY_FIRST } from "@akasha/exercise-access/day-of-week"
import { rowsFor } from "@akasha/exercise-access/exercise-rows"
import { SCHEDULE_DAY_FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { freeSlug, scheduleDaySlug } from "@akasha/exercise-access/session-derive"
import { pageStem } from "@akasha/named-for/page-stem"
import type { Value } from "@akasha/pages-system/page-value"
import {
  asJson,
  DATA,
  JSON_SAID,
  refusedBy,
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

const TITLE = "--title"

const DESCRIPTION = "--description"

const DEFAULT_TITLE = "Weekly Schedule"

const DAY_FLAGS = DAYS_OF_WEEK_MONDAY_FIRST.map((day) => `--${day}`)

const SHAPE = { valued: [TITLE, DESCRIPTION, ...DAY_FLAGS], switches: [JSON_SAID] }

const FOCUS_CHOICES: readonly string[] = SCHEDULE_DAY_FOCUS_OPTIONS

const WORKOUT_SCHEDULE = "workout-schedule"

const SCHEDULE_DAY = "schedule-day"

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
      refusals.push(`\`${flag}\` says what ${capitalizeDayOfWeek(day)} trains, and none is named`)
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

function standingDown(
  root: string,
  slugs: readonly string[]
): { readonly writings: readonly Writing[] } | { readonly refused: string } {
  const writings: Writing[] = []
  for (const slug of slugs) {
    const was = standingAt(root, WORKOUT_SCHEDULE, slug)
    if ("refused" in was) return was
    if (was.values === null) continue
    writings.push({
      pageTypeSlug: WORKOUT_SCHEDULE,
      slug,
      values: { ...was.values, workoutScheduleActive: false },
    })
  }
  return { writings }
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

  try {
    const standing = await rowsFor({ pageTypeSlug: WORKOUT_SCHEDULE, select: ["id", "slug"] })
    if ("unread" in standing) return refusedBy([standing.unread], DATA)
    const active = await rowsFor({
      pageTypeSlug: WORKOUT_SCHEDULE,
      where: [{ key: "workoutScheduleActive", eq: true }],
      select: ["id", "slug"],
    })
    if ("unread" in active) return refusedBy([active.unread], DATA)

    const taken = new Set(
      standing.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
    )
    const scheduleSlug = freeSlug(pageStem(title), taken)

    const stoodDown = standingDown(
      given.root,
      active.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
    )
    if ("refused" in stoodDown) return refusedBy([stoodDown.refused], DATA)

    const scheduleValues: Value = {
      title,
      workoutScheduleActive: true,
      ...(description !== undefined ? { workoutScheduleDescription: description } : {}),
    }

    const days: DayFocus[] = []
    const dayWritings: Writing[] = []
    for (const day of DAYS_OF_WEEK_MONDAY_FIRST) {
      const focus = focuses.get(day)
      if (focus === undefined) continue
      const daySlug = scheduleDaySlug(scheduleSlug, day)
      dayWritings.push({
        pageTypeSlug: SCHEDULE_DAY,
        slug: daySlug,
        values: {
          title: `${capitalizeDayOfWeek(day)} — ${focus}`,
          scheduleSlug,
          dayOfWeek: day,
          focus,
        },
      })
      days.push({ day, focus, slug: daySlug })
    }

    const edits = editsFor(given.root, [
      ...stoodDown.writings,
      { pageTypeSlug: WORKOUT_SCHEDULE, slug: scheduleSlug, values: scheduleValues },
      ...dayWritings,
    ])
    if ("refused" in edits) return refusedBy([edits.refused], DATA)
    const answer = landed(given, edits.changes, `stand up the schedule ${scheduleSlug}`)
    if (answer.code !== 0) return answer

    if (wantsJson(said)) return asJson({ slug: scheduleSlug, title, days })
    return told([
      `slug\t${scheduleSlug}`,
      ...days.map((one) => `day\t${one.day}\t${one.focus}\t${one.slug}`),
      ...answer.report,
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
