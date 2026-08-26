import { type DailyTierColor, type DailyTierLadder, evalDailyTier } from "../../code/packages/alanwalton/personas/core/src/index.ts"

export function tierFloorValues(ladder: DailyTierLadder): ReadonlyMap<DailyTierColor, number> {
  const floors = new Map<DailyTierColor, number>([["black", 0]])
  for (const rung of ladder) floors.set(rung.color, rung.threshold)
  return floors
}

export function ladderFloor(reading: number, ladder: DailyTierLadder): number {
  const { tier } = evalDailyTier(reading, ladder)
  return tierFloorValues(ladder).get(tier) ?? 0
}

export type ReadingUnit = "ratio" | "hours" | "whole" | "level"

export interface StoplightCircle {
  readonly tier: DailyTierColor
  readonly reading: string
  readonly nextTier: DailyTierColor | null
  readonly progress: number | null
}

export interface TierRung<Color> {
  readonly threshold: number
  readonly color: Color
}

export type TierLadder<Color> = readonly TierRung<Color>[]

export interface TierCircle<Color> {
  readonly tier: Color
  readonly reading: string
  readonly nextTier: Color | null
  readonly progress: number | null
}

const SHORTEN_ABOVE = 1000

const READING_MAX_CHARS = 4

const SIGNIFICANT_DIGITS = 15

export function fixed(value: number, digits: number): string {
  const factor = 10 ** digits
  const scaled = Number((value * factor).toPrecision(SIGNIFICANT_DIGITS))
  const rounded = scaled < 0 ? -Math.round(-scaled) : Math.round(scaled)
  return (rounded / factor).toFixed(digits)
}

function readingCandidates(reading: number, unit: ReadingUnit): readonly string[] {
  if (unit === "ratio") return [fixed(reading, 2), fixed(reading, 1), fixed(reading, 0)]
  if (unit === "hours") return [fixed(reading, 1), fixed(reading, 0)]
  if (unit === "level") {
    return [Number.isInteger(reading) ? String(reading) : fixed(reading, 1), fixed(reading, 0)]
  }
  const magnitude = Math.abs(reading)
  if (magnitude >= SHORTEN_ABOVE) {
    const thousands = reading / SHORTEN_ABOVE
    return [`${fixed(thousands, 1)}k`, `${fixed(thousands, 0)}k`]
  }
  return [fixed(reading, 0)]
}

export function formatReading(reading: number, unit: ReadingUnit): string {
  const candidates = readingCandidates(reading, unit)
  const fits = candidates.find((candidate) => candidate.length <= READING_MAX_CHARS)
  if (fits !== undefined) return fits
  return candidates[candidates.length - 1] ?? String(Math.round(reading))
}

export const TIER_ORDER: readonly DailyTierColor[] = ["black", "red", "yellow", "green", "blue"]

function arcTier<Color extends string>(
  tier: Color,
  nextTier: Color | null
): Color | DailyTierColor | null {
  if (nextTier === null) return null
  const order: readonly string[] = TIER_ORDER
  const base = order.indexOf(tier)
  const next = order.indexOf(nextTier)
  if (base === -1 || next === -1 || next <= base + 1) return nextTier
  return TIER_ORDER[base + 1] ?? nextTier
}

export function noDataCircle(unit: ReadingUnit): StoplightCircle {
  return { tier: "black", reading: formatReading(0, unit), nextTier: null, progress: null }
}

export const UNKNOWN_READING = "?"

export function unknownCircle(): StoplightCircle {
  return { tier: "black", reading: UNKNOWN_READING, nextTier: null, progress: null }
}

const DISCARDED_COLOR: DailyTierColor = "black"

export function continuousCircle<Color extends string = DailyTierColor>(args: {
  readonly reading: number | null
  readonly ladder: TierLadder<Color>
  readonly unit: ReadingUnit
  readonly baseline?: number
  readonly blackAt?: number
}): TierCircle<Color | DailyTierColor> {
  if (args.reading === null) return noDataCircle(args.unit)
  const blackAt = args.blackAt ?? 0
  const thresholdsOnly: DailyTierLadder = args.ladder.map((step) => ({
    threshold: step.threshold - blackAt,
    color: DISCARDED_COLOR,
  }))
  const evaluated = evalDailyTier(args.reading / (args.baseline ?? 1) - blackAt, thresholdsOnly)
  const reached = evaluated.level === 0 ? undefined : args.ladder[evaluated.level - 1]
  const nextStep = args.ladder[evaluated.level]
  const tier = reached?.color ?? "black"
  return {
    tier,
    reading: formatReading(args.reading, args.unit),
    nextTier: arcTier(tier, nextStep ? nextStep.color : null),
    progress: evaluated.progressToNextTier,
  }
}

export interface DescendingRung<Color = DailyTierColor> {
  readonly at: number
  readonly color: Color
}

export function descendingCircle<Color extends string = DailyTierColor>(
  reading: number,
  rungs: readonly DescendingRung<Color>[]
): TierCircle<Color | DailyTierColor> {
  const found = rungs.findIndex((rung) => reading >= rung.at)
  const picked = found === -1 ? rungs.length - 1 : found
  const cur = rungs[picked]
  if (cur === undefined) return noDataCircle("whole")
  const above = picked === 0 ? undefined : rungs[picked - 1]
  const below = rungs[picked + 1]
  const fullRing = above === undefined || below === undefined || above.at - cur.at <= 1
  return {
    tier: cur.color,
    reading: formatReading(reading, "whole"),
    nextTier: fullRing ? null : arcTier(cur.color, below.color),
    progress: fullRing ? null : (above.at - 1 - reading) / (above.at - cur.at),
  }
}

export function wholeUnitCircle(args: {
  readonly tier: DailyTierColor
  readonly reading: number
  readonly unit: ReadingUnit
}): StoplightCircle {
  return {
    tier: args.tier,
    reading: formatReading(args.reading, args.unit),
    nextTier: null,
    progress: null,
  }
}
