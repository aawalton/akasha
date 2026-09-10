import { camelizeKey } from "@akasha/pages/access/file-rows"
import { asking } from "@akasha/pages/service/asking"
import { dataError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { entryKeysDeclared } from "../day-entry-keys/day-entry-keys.module.code.ts"
import type {
  Answered,
  AnsweredRow,
  Page,
} from "../day-narrow-types/day-narrow-types.module.code.ts"
import {
  checkoutRoot,
  DAILY_TRACKING,
  DAY_PAGE_TYPE,
  SESSION_TRACKING,
} from "../day-place/day-place.module.code.ts"
import { pageOf } from "../track-pages/track-pages.module.code.ts"

export const MAX_DAY_SESSIONS = 200

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

function sessionsAnswered(query: Readonly<Record<string, unknown>>): Answered {
  const root = checkoutRoot()
  const asked = asking(root, { pageTypeSlug: DAY_PAGE_TYPE, keys: ["slug", SESSIONS] } as never)
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
  readonly n: number
  readonly rows: readonly AnsweredRow[]
}

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

export function sessionPropertyUndeclared(propertyKey: string): Promise<string | null> {
  const declared = entryKeysDeclared(checkoutRoot(), SESSIONS, "a stretch of Alan's day")
  if (declared.has(camelizeKey(propertyKey))) return Promise.resolve(null)
  return Promise.resolve(
    `the \`${SESSIONS}\` entry declares no \`${propertyKey}\`, so every stretch scores 0 and ` +
      "any total written from it would state an instrument's silence as a measurement"
  )
}
