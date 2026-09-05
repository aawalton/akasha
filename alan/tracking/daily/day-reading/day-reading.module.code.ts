import { dataError } from "@akasha/errors-core/exit-code"
import { kebabisedRow } from "@akasha/pages/akasha-page-values"
import { asking } from "@akasha/pages-system-service/asking"
import type {
  Answered,
  AnsweredRow,
  Page,
} from "../day-narrow-types/day-narrow-types.module.code.ts"
import { checkoutRoot, WAKE_DAY } from "../day-place/day-place.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"
import { pageOf } from "../tracking-pages/tracking-pages.module.code.ts"

/**
 * One of Alan's days, read off the akasha page it is kept on.
 *
 * These three readers asked `daily-tracking` of the markdown query engine until this. They were
 * already reading the akasha pages when they did: `pages/page-type/daily-tracking.page-type.md`
 * names a glob over `alan/tracking/daily/wake-days` in its `files:`, so the deriver scanned
 * the very same 135 files and `kebabisedRow` turned their camel keys back to kebab on the way out.
 * The page type name was the last thing about a day that was still markdown, and one declaration
 * file was holding eight workstation readings up.
 *
 * SO WHAT CHANGES IS THE ROAD AND NOT THE PAGES. Measured over all 135 days: every key a day
 * carries — `id`, `date`, the fourteen point counts, the four inbox pairs, `meals`, `persona-days`,
 * `safety-level`, `slug`, `title`, `version` and the rest — answers the same on both roads, taking
 * a number and its own spelling as one value. `statedAt`, which every readout reducer reads a day
 * through, takes a number and a string alike, so the akasha road handing back `3.4354` where the
 * deriver handed back `"3.4354"` reaches no reader as a difference.
 *
 * WHAT THE DERIVER ADDED AND THIS DOES NOT. Sixteen keys were the deriver's own arithmetic rather
 * than anything on a day: `activity-calories`, `strength-calories`, six `*-level`, six
 * `*-stoplight`, `stoplights` and `total-level`, plus `sleep-hours`, `spend-hours`,
 * `surplus-hours` and the `owner` default. `asking` declares the sixteen and fills none of them.
 * Measured over the same 135 days, ten of those are null on every day, and the ones that are not
 * are what all-null inputs reduce to: `⚫` six times, `0` for `stoplights`, `0` for `total-level`,
 * and `0` for `surplus-hours` out of `({sleep-hours} ?? 0) - ({spend-hours} ?? 0)`. Nothing in the
 * repo reads `owner`, a level or a stoplight off a day. Two readers do read the hours, and both
 * are better for the change: `sleepIn` already answered null, and `surplus-reading.ts` says in its
 * own head that a `0` there is "a healthy rung, on a tile that ought to be dark".
 *
 * `sessions` and `completed-tasks` are the one shape that reads differently. The deriver answered
 * the declared extension, the word `jsonl`; `asking` reads the file beside the page and answers the
 * rows themselves. No reader of a day takes either key — the rows are asked for through
 * `sessionsOfDay` and the readers below — so the wider answer costs nothing and hides nothing.
 *
 * `at` names the day page rather than a file path, as it does for a stretch above. Nothing reads it
 * off a day; every caller takes `values`.
 */
function dayAnswered(
  where: Readonly<Record<string, Readonly<Record<string, unknown>>>>,
  keys: readonly string[] | undefined
): Answered {
  const root = checkoutRoot()
  const asked = asking(root, {
    pageTypeSlug: WAKE_DAY,
    where,
    limit: 1,
    ...(keys === undefined ? {} : { keys: keys.map(camelizeKey) }),
  } as never)
  if ("refused" in asked) return { ok: false, why: asked.refused }
  const rows: AnsweredRow[] = asked.rows.map((one) => {
    const row = one as Readonly<Record<string, unknown>>
    return {
      at: typeof row["slug"] === "string" ? row["slug"] : "",
      values: kebabisedRow(row),
    }
  })
  return { ok: true, rows, n: rows.length, unfound: [] }
}

export function askDayByDate(dayStr: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ date: { is: dayStr } }, undefined))
}

export function askDayById(dailyId: string): Promise<Answered> {
  return Promise.resolve(dayAnswered({ id: { is: dailyId } }, undefined))
}

async function only(asked: Promise<Answered>): Promise<Page | null> {
  const answer = await asked
  if (!answer.ok) throw dataError(`reading ${WAKE_DAY} pages: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : pageOf(row.values)
}

export function dayByDate(dayStr: string): Promise<Page | null> {
  return only(askDayByDate(dayStr))
}

export function dayById(dailyId: string): Promise<Page | null> {
  return only(askDayById(dailyId))
}

/**
 * A day's values as the store holds them, in the store's own key spelling.
 *
 * `dayByDate` above hands back a `Page`, whose keys have been camelized. A caller that reduces a
 * day with a function written against the kebab spelling — the readout engine's `activityIn`, which
 * reads `active-calories` — needs the values untouched, so it asks here instead of camelizing and
 * then spelling every key a second way.
 *
 * `keys` is spelled kebab here and camel on the way in, because a key is reached by its property
 * slug written in camel. A key the day page type declares nothing for is refused by `asking` and
 * the refusal is thrown, rather than answered as a row with the key absent: a caller summing a key
 * no property declares would read an instrument's silence as a measurement. That is the same rule
 * `entryKeysDeclared` keeps for a stretch, one level up, and it is why
 * `tools/lib/surplus-fall/readout.ts` no longer names `surplus-hours`, `sleep-hours` and
 * `spend-hours` — the deriver worked those three out and `wake-day` declares none of them.
 */
export async function dayValuesByDate(
  dayStr: string,
  keys?: readonly string[]
): Promise<Readonly<Record<string, unknown>> | null> {
  const answer = dayAnswered({ date: { is: dayStr } }, keys)
  if (!answer.ok) throw dataError(`reading the ${WAKE_DAY} ${dayStr}: ${answer.why}`)
  const row = answer.rows[0]
  return row === undefined ? null : row.values
}
