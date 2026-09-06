import { dataError } from "@akasha/errors-core/exit-code"
import { kebabisedRow } from "@akasha/pages/akasha-page-values"
import { asking } from "@akasha/pages-service/asking"
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
 * The page type is `wake-day`. Keys go in camel, because a key is reached by the property slug a
 * property page states, and rows come back kebab, because every readout reducer below this one is
 * written against the kebab spelling. `statedAt`, which each of those reducers reads a day
 * through, takes a number and its own spelling alike, so a key answered `3.4354` and a key
 * answered `"3.4354"` reach a reader as one value.
 *
 * WHAT THE PAGE STORES AND WHAT THE PAGE WORKS OUT. The six levels, the six stoplights,
 * `stoplights`, `total-level`, `activity-calories`, `strength-calories`, `sleep-hours`,
 * `spend-hours` and `surplus-hours` are calculations `wake-day` declares rather than values a day
 * carries, so a day page states none of them and each answers when its key is asked for. None of
 * the nineteen is null on every day.
 *
 * `sleep-hours` adds up the day's own sleeping stretches, and `surplus-hours` is that sleep less
 * the day's spend. A day with no stretches beside it answers absent for all three hours rather
 * than zero, which is what `sleepIn` and `surplusIn` each read as no reading. `owner` is no key
 * here: `wake-day` declares none, so a question naming it is refused.
 *
 * `sessions` and `completed-tasks` answer the rows in the file beside the page rather than the
 * extension that file is declared as. No reader of a day takes either key — the rows are asked
 * for through `sessionsOfDay` and the readers below.
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
