import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const STRETCH = "session-tracking"

const HELD_ON = "daily-tracking"

const SAFETY_LEVEL = "safety-level"

const DIFFICULTY_LEVEL = "difficulty-level"

const START_TIME = "start-time"

const END_TIME = "end-time"

const MOST_STRETCHES = 200

const MILLISECONDS_TO_THE_HOUR = 3600000

export const AT_EASE = 1

const CHARISMA_UNKNOWN =
  "the day's stretches could not be read, so the charisma is unknown rather than nothing"

export function stretchesOf(dayId: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": STRETCH,
    where: { [HELD_ON]: { is: dayId } },
    keys: [SAFETY_LEVEL, DIFFICULTY_LEVEL, START_TIME, END_TIME],
    "sort-by": START_TIME,
    limit: MOST_STRETCHES,
  }
}

export function easeIn(values: Readonly<Record<string, unknown>>): number | null {
  const safe = statedAt(values[SAFETY_LEVEL])
  const hard = statedAt(values[DIFFICULTY_LEVEL])
  if (safe === null || hard === null) return null
  return safe - hard
}

export function hoursIn(values: Readonly<Record<string, unknown>>): number | null {
  const from = Date.parse(String(values[START_TIME] ?? ""))
  const to = Date.parse(String(values[END_TIME] ?? ""))
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null
  return (to - from) / MILLISECONDS_TO_THE_HOUR
}

export function charismaIn(rows: readonly Row[]): number | null {
  let held: number | null = null
  for (const row of rows) {
    const ease = easeIn(row.values)
    if (ease === null) continue
    const hours = hoursIn(row.values)
    if (hours === null) continue
    held = (held ?? 0) + (ease >= AT_EASE ? hours : 0)
  }
  return held
}

export async function fetchCharismaPoints(ask: Asking, dayId: string): Promise<number | null> {
  const asked = await ask(stretchesOf(dayId))
  if (!asked.ok) throw new Error(`${CHARISMA_UNKNOWN}: ${asked.why}`)
  return charismaIn(asked.rows)
}
