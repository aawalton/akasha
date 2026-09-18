import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

const HEALTH_CAPACITY_HOURS = "health-capacity-hours"

const START_TIME = "start-time"

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

export function capacityHoursOf(
  values: Readonly<Record<string, unknown>>,
  now: Date = new Date()
): number | null {
  const startTime = values[START_TIME]
  if (typeof startTime !== "string") return null
  const from = Date.parse(startTime)
  if (!Number.isFinite(from)) return null
  const endTime = values[END_TIME]
  const stillRunning = typeof endTime !== "string" || endTime === ""
  const to = stillRunning ? now.getTime() : Date.parse(endTime)
  if (!Number.isFinite(to)) return null
  const hours = Math.max(0, to - from) / AN_HOUR
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
