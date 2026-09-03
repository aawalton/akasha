export const SAFETY_LOW = -2

export const SAFETY_HIGH = 5

export const DIFFICULTY_LOW = 0

export const DIFFICULTY_HIGH = 5

export const SAFETY_SAID = "--safety"

export const DIFFICULTY_SAID = "--difficulty"

const HALVES = 2

export type LevelReading =
  | { readonly read: "level"; readonly level: string }
  | { readonly read: "refused"; readonly saying: string }

export type ActivityDifficulty = {
  readonly title: string
  readonly defaultDifficulty: number
}

export function levelSaid(level: number): string {
  if (Number.isInteger(level)) return String(level)
  const sign = level < 0 ? "-" : ""
  return `${sign}${Math.floor(Math.abs(level))}.5`
}

export function readLevel(said: string, low: number, high: number, named: string): LevelReading {
  const level = Number(said)
  if (said.trim() === "" || Number.isNaN(level)) {
    return { read: "refused", saying: `${named} takes a number, and "${said}" reads as none` }
  }
  if (!Number.isInteger(level * HALVES)) {
    return {
      read: "refused",
      saying: `${named} takes a whole step or a half step, and "${said}" falls between them`,
    }
  }
  if (level < low || level > high) {
    return {
      read: "refused",
      saying: `${named} runs from ${low} to ${high}, and "${said}" falls outside that`,
    }
  }
  return { read: "level", level: levelSaid(level) }
}

export function readSafety(said: string): LevelReading {
  return readLevel(said, SAFETY_LOW, SAFETY_HIGH, SAFETY_SAID)
}

export function readDifficulty(said: string): LevelReading {
  return readLevel(said, DIFFICULTY_LOW, DIFFICULTY_HIGH, DIFFICULTY_SAID)
}

export function difficultyForTitle(
  title: string,
  activities: readonly ActivityDifficulty[]
): string | null {
  const holds = title.toLowerCase()
  let best: number | null = null
  for (const one of activities) {
    const wanted = one.title.trim().toLowerCase()
    if (wanted === "") continue
    if (!Number.isFinite(one.defaultDifficulty)) continue
    if (!holds.includes(wanted)) continue
    if (best === null || one.defaultDifficulty > best) best = one.defaultDifficulty
  }
  return best === null ? null : levelSaid(best)
}
