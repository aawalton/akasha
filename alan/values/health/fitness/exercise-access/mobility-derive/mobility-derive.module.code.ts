export type Trend = "improving" | "declining" | "flat" | "insufficient"

export const NO_SIDE = "n-a"

const FEWEST_FOR_A_TREND = 2

export function mobilityReadingName(metric: string, date: string, side: string): string {
  return side === NO_SIDE ? `${metric}-${date}` : `${metric}-${date}-${side}`
}

export function mobilityReadingTitle(metric: string, date: string, side: string): string {
  return side === NO_SIDE ? `${metric} ${date}` : `${metric} ${date} (${side})`
}

export function mobilityTrend(oldestFirst: readonly number[]): Trend {
  if (oldestFirst.length < FEWEST_FOR_A_TREND) return "insufficient"
  const first = oldestFirst[0]
  const last = oldestFirst[oldestFirst.length - 1]
  if (first === undefined || last === undefined) return "insufficient"
  if (last > first) return "improving"
  if (last < first) return "declining"
  return "flat"
}
