export type TierColor = "black" | "red" | "orange" | "yellow" | "green" | "blue"

export type Rung = {
  readonly at: number
  readonly color: TierColor
}

export type Tiered = {
  readonly tier: TierColor
  readonly nextTier: TierColor | null
  readonly progress: number | null
}

export const BELOW_EVERY_RUNG: TierColor = "black"

const RUNGS: readonly (readonly [string, TierColor])[] = [
  ["blackAt", "black"],
  ["redAt", "red"],
  ["orangeAt", "orange"],
  ["yellowAt", "yellow"],
  ["greenAt", "green"],
  ["blueAt", "blue"],
]

export const DECIMAL_PLACES = 2

export function statedAt(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  const read = Number(trimmed)
  return Number.isFinite(read) ? read : null
}

export function rungsIn(values: Readonly<Record<string, unknown>>): readonly Rung[] {
  const rungs: Rung[] = []
  for (const [key, color] of RUNGS) {
    const at = statedAt(values[key])
    if (at !== null) rungs.push({ at, color })
  }
  return rungs
}

export function climbs(rungs: readonly Rung[]): boolean {
  if (rungs.length < 2) return false
  for (let i = 1; i < rungs.length; i += 1) {
    const above = rungs[i]
    const below = rungs[i - 1]
    if (above === undefined || below === undefined) return false
    if (above.at <= below.at) return false
  }
  return true
}

export function falls(rungs: readonly Rung[]): boolean {
  if (rungs.length < 2) return false
  for (let i = 1; i < rungs.length; i += 1) {
    const under = rungs[i]
    const over = rungs[i - 1]
    if (under === undefined || over === undefined) return false
    if (under.at >= over.at) return false
  }
  return true
}

function climbedTo(reading: number, rungs: readonly Rung[]): Tiered {
  let reached = -1
  for (let i = 0; i < rungs.length; i += 1) {
    const rung = rungs[i]
    if (rung !== undefined && reading >= rung.at) reached = i
  }

  const here = rungs[reached]
  const next = rungs[reached + 1]
  const tier = here === undefined ? BELOW_EVERY_RUNG : here.color
  if (next === undefined) return { tier, nextTier: null, progress: null }
  if (here === undefined) return { tier, nextTier: next.color, progress: null }

  const span = next.at - here.at
  const climbed = (reading - here.at) / span
  return { tier, nextTier: next.color, progress: Math.min(1, Math.max(0, climbed)) }
}

function fellTo(reading: number, rungs: readonly Rung[]): Tiered {
  let reached = rungs.length - 1
  for (let i = 0; i < rungs.length; i += 1) {
    const rung = rungs[i]
    if (rung !== undefined && reading >= rung.at) {
      reached = i
      break
    }
  }

  const here = rungs[reached]
  if (here === undefined) return { tier: BELOW_EVERY_RUNG, nextTier: null, progress: null }
  const next = rungs[reached + 1]
  const over = rungs[reached - 1]
  if (next === undefined) return { tier: here.color, nextTier: null, progress: null }
  if (over === undefined) return { tier: here.color, nextTier: next.color, progress: null }

  const span = over.at - here.at
  const fell = (over.at - reading) / span
  return { tier: here.color, nextTier: next.color, progress: Math.min(1, Math.max(0, fell)) }
}

export function tierAt(reading: number, rungs: readonly Rung[]): Tiered | null {
  if (!Number.isFinite(reading)) return null
  if (climbs(rungs)) return climbedTo(reading, rungs)
  if (falls(rungs)) return fellTo(reading, rungs)
  return null
}

export function withoutSignedZero(said: number): number {
  return said === 0 ? 0 : said
}

export function readingSaid(reading: number, figureFormat?: string): string {
  if (figureFormat === "integer") return String(withoutSignedZero(Math.round(reading)))
  if (figureFormat === "decimal") {
    return String(withoutSignedZero(Number(reading.toFixed(DECIMAL_PLACES))))
  }
  return String(reading)
}
