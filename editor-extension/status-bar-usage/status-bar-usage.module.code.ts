export type Mean = {
  readonly value: number | null
  readonly over: number
}

export type UsageReading = {
  readonly sessionPct: number | null
  readonly weeklyPct: number | null
}

function pctOf(mean: Mean): number | null {
  return mean.over === 0 ? null : mean.value
}

export function readingOf(session: Mean, weekly: Mean): UsageReading {
  return { sessionPct: pctOf(session), weeklyPct: pctOf(weekly) }
}
