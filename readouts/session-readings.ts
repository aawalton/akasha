import { dayAfter } from "../day/calendar-day.ts"
import { nyWallToInstant } from "../day/day.ts"
import { type Ask, askOr } from "./readout-resolver.ts"

export const SESSIONS_QUERY = "session-tracking-all"

export const WAKE_HOUR = 6

const NEEDED = [
  "title",
  "start-time",
  "end-time",
  "safety-level",
  "difficulty-level",
  "capacity-rate",
] as const

const SIDECAR_DAY = /\/(\d{4}-\d{2}-\d{2})\.(?:[\w-]+\.)?sessions\.jsonl#/
const INSTANT_SHAPE = /^\d{4}-\d{2}-\d{2}T/
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

function parseSidecarDay(at: string): string | null {
  const captured = SIDECAR_DAY.exec(at)
  return captured === null ? null : (captured[1] ?? null)
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
  if (at === undefined) {
    throw new Error(
      `${SESSIONS_QUERY} handed back a session with no \`at\`, so nothing states which day it was part of`
    )
  }
  const day = parseSidecarDay(at)
  if (day === null) {
    throw new Error(
      `${SESSIONS_QUERY} handed back \`${at}\`, which names no \`<day>.sessions.jsonl\` sidecar, ` +
        `so nothing states which day the session was part of`
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
