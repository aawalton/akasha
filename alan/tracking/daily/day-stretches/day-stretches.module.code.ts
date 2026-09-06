import { dataError } from "@akasha/errors-core/exit-code"
import { asking } from "@akasha/pages-service/asking"
import { entryKeysDeclared } from "../day-entry-keys/day-entry-keys.module.code.ts"
import type {
  Answered,
  AnsweredRow,
  Page,
} from "../day-narrow-types/day-narrow-types.module.code.ts"
import {
  checkoutRoot,
  DAILY_TRACKING,
  SESSION_TRACKING,
  WAKE_DAY,
} from "../day-place/day-place.module.code.ts"
import { camelizeKey } from "../tracking-keys/tracking-keys.module.code.ts"
import { pageOf } from "../tracking-pages/tracking-pages.module.code.ts"

/**
 * How many session rows one day is read as holding at the outside.
 *
 * Every by-day session read below carries it, so the three callers that used to hold a copy of this
 * number each — `lib/tracking/resolve.ts`, `lib/daily-tracking/sleep-minutes.ts` and
 * `lib/daily-tracking/breathing-sets.ts` — cannot drift apart from one another.
 */
export const MAX_DAY_SESSIONS = 200

/**
 * The session rows of a day, wherever that day is kept.
 *
 * These readers exist because a session row is half of a day, and every caller that wanted one used
 * to compose its own query over `session-tracking` and hand it to the page client directly. That is
 * the same fault as writing a day around `landSessionRow`: the reach decides for itself where the
 * rows are, and once one day is markdown and the next is akasha it answers out of one half and
 * reports the other half as empty.
 *
 * A stretch is no longer a page, so it is no longer asked for as one. `session-tracking` was a page
 * type only while the rows were markdown files; in akasha a stretch is a row of the `sessions` entry
 * property hanging off the day it was part of, and `sessions.page-property-entry.ts` states that
 * outright — "A stretch is a row here rather than a page a query may ask of." Asking the old
 * registry for a page type by that name is what took Alan's safety and capacity tiles dark: the
 * registry answers `names no page type whose pages are files`, and no restore of the declaration
 * could fix it, because the declaration is right and the query was wrong.
 *
 * So the rows are read off the days. `asking` refuses rather than answering nothing where it cannot
 * read — an unknown page type and an undeclared key are both refusals — which is why the reach is
 * made through it rather than through `valuesOfType`, which answers `[]` for a page type that does
 * not exist and would put the silent zero back. The narrowing, sorting and limiting are done here
 * because they are over rows of an entry rather than over pages, and `asking` narrows pages.
 */
const SESSIONS = "sessions"

function meetsTest(held: unknown, test: Readonly<Record<string, unknown>>, key: string): boolean {
  const absent = held === undefined || held === null || held === ""
  for (const [how, want] of Object.entries(test)) {
    switch (how) {
      case "empty":
        if (absent !== (want === true)) return false
        break
      case "is":
        if (absent || String(held) !== String(want)) return false
        break
      case "before":
        if (absent || !(String(held) < String(want))) return false
        break
      case "at-or-after":
        if (absent || !(String(held) >= String(want))) return false
        break
      default:
        throw dataError(
          `no test is named \`${how}\`, so the stretches narrowed by \`${key}\` are unknown ` +
            "rather than none; the tests are `empty`, `is`, `before` and `at-or-after`"
        )
    }
  }
  return true
}

/**
 * Every stretch akasha holds, as rows, with the day each is beside naming it.
 *
 * `at` names the day page the row is beside rather than a file path. Nothing reads it as a
 * path — `allSessions`'s one caller takes `values` alone — and a stretch has no file of its own to
 * name, so naming the day is the truest thing available.
 */
function sessionsAnswered(query: Readonly<Record<string, unknown>>): Answered {
  const root = checkoutRoot()
  const asked = asking(root, { pageTypeSlug: WAKE_DAY, keys: ["slug", SESSIONS] } as never)
  if ("refused" in asked) return { ok: false, why: asked.refused }

  const wanted = query["keys"]
  if (wanted !== undefined) {
    const declared = entryKeysDeclared(root, SESSIONS, "a stretch of Alan's day")
    for (const key of wanted as readonly string[]) {
      const camel = camelizeKey(key)
      if (declared.has(camel)) continue
      return {
        ok: false,
        why:
          `\`keys\` names \`${key}\`, and a stretch of Alan's day declares no such key. the keys ` +
          `are ${[...declared].sort().join(", ")}`,
      }
    }
  }

  let rows: AnsweredRow[] = []
  for (const day of asked.rows) {
    const held = day[SESSIONS]
    if (held === undefined) continue
    if (!Array.isArray(held)) {
      return {
        ok: false,
        why: `the stretches beside \`${String(day["slug"])}\` are no list, so they are unread`,
      }
    }
    const at = typeof day["slug"] === "string" ? day["slug"] : ""
    for (const one of held) {
      rows.push({ at, values: one as Readonly<Record<string, unknown>> })
    }
  }

  const where = query["where"] as Readonly<Record<string, Record<string, unknown>>> | undefined
  if (where !== undefined) {
    for (const [key, test] of Object.entries(where)) {
      const camel = camelizeKey(key)
      rows = rows.filter((row) => meetsTest(row.values[camel], test, key))
    }
  }

  const sortBy = query["sort-by"]
  if (typeof sortBy === "string") {
    const camel = camelizeKey(sortBy)
    const said = (row: AnsweredRow): string => String(row.values[camel] ?? "")
    rows.sort((one, other) => (said(one) < said(other) ? -1 : said(one) > said(other) ? 1 : 0))
    if (query["descending"] === true) rows.reverse()
  }

  // The count is taken before the limit, so a caller comparing the two reads a short answer as
  // short rather than as the whole of what there is.
  const n = rows.length
  const limit = query["limit"]
  if (typeof limit === "number") rows = rows.slice(0, limit)

  if (wanted !== undefined) {
    const keys = (wanted as readonly string[]).map(camelizeKey)
    rows = rows.map((row) => {
      const held: Record<string, unknown> = {}
      for (const key of keys) if (key in row.values) held[key] = row.values[key]
      return { at: row.at, values: held }
    })
  }

  return { ok: true, rows, n, unfound: [] }
}

function askSessions(query: Readonly<Record<string, unknown>>): Promise<Answered> {
  return Promise.resolve(sessionsAnswered(query))
}

async function sessionRows(asked: Promise<Answered>, doing: string): Promise<readonly Page[]> {
  const answer = await asked
  if (!answer.ok) throw dataError(`${doing}: ${answer.why}`)
  return answer.rows.map((row) => pageOf(row.values))
}

/** The one session left open, newest first, or nothing where none is open. */
export async function openSession(): Promise<Page | null> {
  const rows = await sessionRows(
    askSessions({
      where: { "end-time": { empty: true } },
      "sort-by": "start-time",
      descending: true,
      limit: 1,
    }),
    "finding the open session"
  )
  return rows[0] ?? null
}

/** The sessions begun before an instant, newest first. */
export function sessionsBefore(beforeInstant: Date, limit: number): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: { "start-time": { before: beforeInstant.toISOString() } },
      "sort-by": "start-time",
      descending: true,
      limit,
    }),
    "finding the prior closed session"
  )
}

/** The sessions beside one day, named by that day's id, oldest first. */
export function sessionsOfDay(dailyId: string, keys?: readonly string[]): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: { [DAILY_TRACKING]: { is: dailyId } },
      "sort-by": "start-time",
      limit: MAX_DAY_SESSIONS,
      ...(keys === undefined ? {} : { keys }),
    }),
    "listing the sessions of a day"
  )
}

/** The sessions begun within a span, oldest first. */
export function sessionsInSpan(
  fromInstant: Date,
  beforeInstant: Date,
  keys?: readonly string[]
): Promise<readonly Page[]> {
  return sessionRows(
    askSessions({
      where: {
        "start-time": {
          "at-or-after": fromInstant.toISOString(),
          before: beforeInstant.toISOString(),
        },
      },
      "sort-by": "start-time",
      limit: MAX_DAY_SESSIONS,
      ...(keys === undefined ? {} : { keys }),
    }),
    "reading the sessions of a span"
  )
}

export interface AllSessions {
  /** How many rows the store counted, which a caller compares against what it was handed. */
  readonly n: number
  readonly rows: readonly AnsweredRow[]
}

/**
 * Every session row there is, unfiltered, with the store's own count beside it.
 *
 * Two callers total sessions over the whole history rather than over a day, and a total summed from
 * a short read is low without anything saying so. That comparison is made here, because a short read
 * of *every* row is wrong for any caller of this — there is no reading it could be right for. The
 * count is handed back beside the rows all the same, so a caller with a further check of its own
 * makes it against the number the store gave rather than against one this call invented.
 *
 * The rows are handed back whole rather than as `Page`s, because a caller that works out which day
 * a row was part of reads it off the row's `at` — the sidecar file the row is kept in — and
 * camelizing the values would leave that behind.
 */
export async function allSessions(): Promise<AllSessions> {
  const answer = await askSessions({})
  if (!answer.ok) throw dataError(`reading every ${SESSION_TRACKING} row: ${answer.why}`)
  if (answer.rows.length !== answer.n) {
    throw dataError(
      `the ${SESSION_TRACKING} read came back with ${answer.rows.length} of ${answer.n} row(s), ` +
        "so any total summed from it would be low"
    )
  }
  return { n: answer.n, rows: answer.rows }
}

/**
 * Why a property may not be scored across stretches, or nothing where it may.
 *
 * A caller that sums a property the entry declares nothing for gets 0 from every row and cannot
 * tell that apart from a real total of nothing, so it would write an instrument's silence as a
 * measurement.
 *
 * What a stretch may carry is asked of the `sessions` entry property, which is where a stretch's
 * fields are declared now that a stretch is a row beside a day rather than a page. This asked the
 * markdown `page-property-definition` page type until that page type was taken away, after which
 * the read threw on every call and the two writers above it threw with it.
 */
export function sessionPropertyUndeclared(propertyKey: string): Promise<string | null> {
  const declared = entryKeysDeclared(checkoutRoot(), SESSIONS, "a stretch of Alan's day")
  if (declared.has(camelizeKey(propertyKey))) return Promise.resolve(null)
  return Promise.resolve(
    `the \`${SESSIONS}\` entry declares no \`${propertyKey}\`, so every stretch scores 0 and ` +
      "any total written from it would state an instrument's silence as a measurement"
  )
}
