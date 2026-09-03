import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const STRETCH = "session-tracking"

const HELD_ON = "daily-tracking"

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const START_TIME = "start-time"

const MOST_STRETCHES = 200

const CAPACITY_UNKNOWN =
  "the day's stretches could not be read, so the capacity is unknown rather than nothing"

export function stretchesOf(dayId: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": STRETCH,
    where: { [HELD_ON]: { is: dayId } },
    keys: [HEALTH_CAPACITY_HOURS],
    "sort-by": START_TIME,
    limit: MOST_STRETCHES,
  }
}

const TITLE = "title"

const END_TIME = "end-time"

const SAFETY_LEVEL = "safety-level"

const DIFFICULTY_LEVEL = "difficulty-level"

const AN_HOUR = 3_600_000

const WORD_CHARACTER = /[A-Za-z0-9]/

const GIVES_BACK: readonly (readonly [string, number])[] = [
  ["bath", 3],
  ["pod", 3],
  ["breathing", 1],
  ["sleep", 1],
  ["rest", 1],
]

const TAKES_BY_GAP = new Map<number, number>([
  [-0.5, 1.5],
  [-1, 2],
  [-1.5, 3],
  [-2, 4],
  [-2.5, 6],
  [-3, 8],
  [-3.5, 12],
  [-4, 16],
  [-4.5, 24],
])

function holdsWord(text: string, word: string): boolean {
  const inText = text.toLowerCase()
  const inWord = word.toLowerCase()
  let from = 0
  for (;;) {
    const found = inText.indexOf(inWord, from)
    if (found === -1) return false
    const before = found === 0 ? "" : (inText[found - 1] as string)
    const after = inText[found + inWord.length] ?? ""
    if (!WORD_CHARACTER.test(before) && !WORD_CHARACTER.test(after)) return true
    from = found + 1
  }
}

export function recoveryFor(title: unknown): number {
  if (typeof title !== "string") return 0
  for (const [word, gives] of GIVES_BACK) if (holdsWord(title, word)) return gives
  return 0
}

export function costFor(safetyLevel: unknown, difficultyLevel: unknown): number {
  const safety = statedAt(safetyLevel)
  const difficulty = statedAt(difficultyLevel)
  if (safety === null || difficulty === null) return 0
  const gap = safety - difficulty
  if (gap >= 1) return 0
  if (gap >= 0) return 1 - gap
  if (gap <= -5) return 32
  return TAKES_BY_GAP.get(gap) ?? 0
}

export function capacityHoursOf(values: Readonly<Record<string, unknown>>): number | null {
  const startTime = values[START_TIME]
  const endTime = values[END_TIME]
  if (typeof startTime !== "string" || typeof endTime !== "string" || endTime === "") return null
  const from = Date.parse(startTime)
  const to = Date.parse(endTime)
  if (!Number.isFinite(from) || !Number.isFinite(to)) return null
  const hours = Math.abs(to - from) / AN_HOUR
  const worth = recoveryFor(values[TITLE]) - costFor(values[SAFETY_LEVEL], values[DIFFICULTY_LEVEL])
  return hours * worth
}

export function capacityIn(rows: readonly Row[]): number | null {
  let held: number | null = null
  for (const row of rows) {
    const hours = statedAt(row.values[HEALTH_CAPACITY_HOURS])
    if (hours === null) continue
    held = (held ?? 0) + hours
  }
  return held
}

export async function fetchCapacityHours(ask: Asking, dayId: string): Promise<number | null> {
  const asked = await ask(stretchesOf(dayId))
  if (!asked.ok) throw new Error(`${CAPACITY_UNKNOWN}: ${asked.why}`)
  return capacityIn(asked.rows)
}
