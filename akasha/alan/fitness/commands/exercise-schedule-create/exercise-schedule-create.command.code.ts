import type { Answer } from "@akasha/command-system/calling"
import { SCHEDULE_DAY_FOCUS_OPTIONS } from "@akasha/exercise-access/exercise-vocabulary"
import { createPage, getPages, patchPage } from "@collections/exercises/pages/access"
import {
  capitalizeDayOfWeek,
  DAYS_OF_WEEK_MONDAY_FIRST,
} from "@collections/exercises/tracking/day-of-week"
import { freeSlug, scheduleDaySlug, slugStem } from "@collections/exercises/tracking/derive"
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

export async function exerciseScheduleCreate(argv: readonly string[] = []): Promise<Answer> {
  const said = wordsIn(argv, SHAPE)
  if ("refused" in said) return refusedBy(said.refused)
  const title = said.named[TITLE] ?? DEFAULT_TITLE
  const description = said.named[DESCRIPTION]
  const focuses = focusByDay(said.named)
  if ("refused" in focuses) return refusedBy(focuses.refused)

  try {
    const active = await getPages({
      pageTypeSlug: "workout-schedule",
      where: [{ key: "active", eq: true }],
      select: ["id", "slug"],
    })
    for (const row of active.rows) {
      if (row.slug === null) continue
      await patchPage("workout-schedule", row.slug, { active: false })
    }

    const standing = await getPages({ pageTypeSlug: "workout-schedule", select: ["id", "slug"] })
    const taken = new Set(
      standing.rows.map((row) => row.slug).filter((slug): slug is string => slug !== null)
    )
    const scheduleSlug = freeSlug(slugStem(title), taken)

    await createPage("workout-schedule", scheduleSlug, {
      slug: scheduleSlug,
      title,
      active: true,
      ...(description !== undefined ? { description } : {}),
    })

    const days: DayFocus[] = []
    for (const day of DAYS_OF_WEEK_MONDAY_FIRST) {
      const focus = focuses.get(day)
      if (focus === undefined) continue
      const daySlug = scheduleDaySlug(scheduleSlug, day)
      await createPage("schedule-day", daySlug, {
        slug: daySlug,
        title: `${capitalizeDayOfWeek(day)} — ${focus}`,
        scheduleSlug,
        dayOfWeek: day,
        focus,
      })
      days.push({ day, focus, slug: daySlug })
    }

    if (wantsJson(said)) return asJson({ slug: scheduleSlug, title, days })
    return told([
      `slug\t${scheduleSlug}`,
      ...days.map((one) => `day\t${one.day}\t${one.focus}\t${one.slug}`),
    ])
  } catch (thrown) {
    return refusedBy([thrown instanceof Error ? thrown.message : String(thrown)], DATA)
  }
}
