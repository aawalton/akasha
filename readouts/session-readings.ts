import { dayAfter } from "@akasha/day/day-string"
import { nyWallToInstant } from "@akasha/day/new-york-wall"
import { dayOfName } from "../tools/lib/tracking/day-place.ts"
import { type Ask, askOr } from "./readout-resolver.ts"

export const SESSIONS_QUERY = "session-tracking-all"

export const WAKE_HOUR = 6

/**
 * The key a session row carries the name of the day page it was written beside under.
 *
 * The store works this key out rather than taking it from a writer — `rowsPagesIn` in
 * tools/lib/page-rows.ts hands the parent page's own name down as `<page-type>-slug` — so it names
 * whichever day page the row really sits next to, in whichever half of the migration that is.
 */
const HELD_ON = "daily-tracking-slug"

const NEEDED = [
  HELD_ON,
  "title",
  "start-time",
  "end-time",
  "safety-level",
  "difficulty-level",
  "capacity-rate",
] as const

const INSTANT_SHAPE = /^\d{4}-\d{2}-\d{2}T/
const DAY_SHAPE = /^\d{4}-\d{2}-\d{2}$/
const SLEEP_TITLE = "sleep"

export interface SessionPage {
  readonly day: string
  readonly title: string | null
  readonly startTime: string | null
  readonly endTime: string | null
  readonly safetyLevel: number | null
  readonly difficultyLevel: number | null
  readonly capacityRate: number | null
}

/**
 * The date of the day a session was part of, read off the day page the row sits beside.
 *
 * This used to be parsed out of the row's `at` — the sidecar file path — by a regex that wanted a
 * `/` immediately before the date. A markdown day's sidecar is
 * `pages/daily-tracking/<date>.daily-tracking.sessions.jsonl` and matched; the same day once moved
 * is `.../daily-trackings/day-<date>.daily-tracking.sessions.jsonl`, where the character before the
 * date is the `-` of `day-`, and matched nothing. Because `allSessions` reads every row of both
 * halves at once, the first day to move would have refused the whole reading rather than that one
 * day, and Alan's wake window, capacity and active calories are all drawn from it.
 *
 * The repair is to stop reading the path. `daily-tracking-slug` is the name of the day page the row
 * was filed beside, and `dayOfName` is the funnel's own inverse of the rule that spells that name.
 * Neither this file nor the query it reads says how a day is spelled, so this reader and the writer
 * that filed the row cannot come to disagree: they read one rule.
 *
 * The date rather than the name is what comes back, because `onDay` below compares it against a day
 * the caller got from `getEsoDayStr`. A name handed back here would match nothing and report every
 * day as empty without refusing.
 */
function dayHeldOn(values: Readonly<Record<string, unknown>>): string | null {
  const held = values[HELD_ON]
  if (typeof held !== "string" || held.trim() === "") return null
  const day = dayOfName(held.trim())
  return DAY_SHAPE.test(day) ? day : null
}

function textOf(values: Readonly<Record<string, unknown>>, key: string): string | null {
  const held = values[key]
  if (typeof held === "string" && held.trim() !== "") return held
  if (typeof held === "number" && Number.isFinite(held)) return String(held)
  return null
}

function numberOf(values: Readonly<Record<string, unknown>>, key: string): number | null {
  const stated = textOf(values, key)
  if (stated === null) return null
  const parsed = Number(stated)
  return Number.isFinite(parsed) ? parsed : null
}

export function sessionOf(
  at: string | undefined,
  values: Readonly<Record<string, unknown>>
): SessionPage {
  const day = dayHeldOn(values)
  if (day === null) {
    throw new Error(
      `${SESSIONS_QUERY} handed back a session${at === undefined ? "" : ` in \`${at}\``} whose ` +
        `\`${HELD_ON}\` reads \`${String(values[HELD_ON])}\`, which names no day page the funnel ` +
        "spells, so nothing says which day the session was part of"
    )
  }
  return {
    day,
    title: textOf(values, "title"),
    startTime: textOf(values, "start-time"),
    endTime: textOf(values, "end-time"),
    safetyLevel: numberOf(values, "safety-level"),
    difficultyLevel: numberOf(values, "difficulty-level"),
    capacityRate: numberOf(values, "capacity-rate"),
  }
}

export interface SessionAnswer {
  readonly n: number
  readonly rows: readonly {
    readonly at?: string
    readonly values: Readonly<Record<string, unknown>>
  }[]
}

export function sessionsFromAnswer(answer: SessionAnswer): readonly SessionPage[] {
  if (answer.rows.length === 0) {
    throw new Error(
      `${SESSIONS_QUERY} answered with no sessions at all, which is a read that failed rather ` +
        `than a life with nothing in it — every circle drawn from it would show an ordinary blank day`
    )
  }
  if (answer.n !== answer.rows.length) {
    throw new Error(
      `${SESSIONS_QUERY} counted ${answer.n} sessions and handed back ${answer.rows.length}, ` +
        `so this reading would have measured the window it was shown rather than the days it was asked for`
    )
  }
  for (const key of NEEDED) {
    const carried = answer.rows.filter((row) => {
      const value = row.values[key]
      return value !== null && value !== undefined
    }).length
    if (carried === 0) {
      throw new Error(
        `${SESSIONS_QUERY}: not one of ${answer.rows.length} sessions carries \`${key}\`, so either ` +
          `the corpus lost it or this reader asked for a spelling the pages do not use — ` +
          `a key spelled the other reader's way comes back null on every row without refusing`
      )
    }
  }
  return answer.rows.map((row) => sessionOf(row.at, row.values))
}

export async function readSessionPages(ask?: Ask): Promise<readonly SessionPage[]> {
  return sessionsFromAnswer(await askOr(ask)(SESSIONS_QUERY, {}))
}

function onDay(pages: readonly SessionPage[], day: string): readonly SessionPage[] {
  return pages.filter((page) => page.day === day)
}

function hoursBetween(startTime: string, endTime: string | null, now: number): number {
  const to = endTime === null ? now : Date.parse(endTime)
  return (to - Date.parse(startTime)) / 3_600_000
}

type StartedSession = SessionPage & { readonly startTime: string }

function hasStarted(page: SessionPage): page is StartedSession {
  return page.startTime !== null
}

export function capacityFromSessions(
  pages: readonly SessionPage[],
  day: string,
  now: number = Date.now()
): number | null {
  const held = onDay(pages, day).filter(hasStarted)
  if (held.length === 0) return null
  let capacity = 0
  for (const page of held) {
    capacity += hoursBetween(page.startTime, page.endTime, now) * (page.capacityRate ?? 0)
  }
  return capacity
}

export function wakeBoundary(day: string): number {
  return nyWallToInstant(day, WAKE_HOUR, 0).getTime()
}

export function wakeInstant(pages: readonly SessionPage[], day: string): number {
  const from = wakeBoundary(day)
  const to = wakeBoundary(dayAfter(day))
  let woke: number | null = null
  for (const page of onDay(pages, day)) {
    if (page.title === null || page.title.trim().toLowerCase() !== SLEEP_TITLE) continue
    if (page.startTime === null || !INSTANT_SHAPE.test(page.startTime)) continue
    if (page.endTime === null || !INSTANT_SHAPE.test(page.endTime)) continue
    const ended = Date.parse(page.endTime)
    if (ended <= Date.parse(page.startTime)) continue
    if (ended < from || ended >= to) continue
    if (woke === null || ended < woke) woke = ended
  }
  return woke ?? from
}

export interface WakeWindow {
  readonly from: number
  readonly to: number
}

export function wakeWindow(pages: readonly SessionPage[], day: string): WakeWindow {
  return { from: wakeInstant(pages, day), to: wakeInstant(pages, dayAfter(day)) }
}
