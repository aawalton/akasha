export type DailyTierColor = "black" | "red" | "yellow" | "green" | "blue"

export interface DailyTierStep {
  readonly threshold: number
  readonly color: DailyTierColor
}

export type DailyTierLadder = readonly DailyTierStep[]

export interface DailyTierResult {
  readonly level: number
  readonly tier: DailyTierColor
  readonly nextTier: DailyTierColor | null
  readonly pointsToNextTier: number | null
  readonly progressToNextTier: number | null
}

export function evalDailyTier(points: number, ladder: DailyTierLadder): DailyTierResult {
  const p = Math.max(0, points)
  let level = 0
  for (const step of ladder) {
    if (p >= step.threshold) level++
    else break
  }
  const reached = level === 0 ? undefined : ladder[level - 1]
  const tier: DailyTierColor = reached?.color ?? "black"
  const nextStep = ladder[level]
  const floor = reached?.threshold ?? 0
  const span = nextStep ? nextStep.threshold - floor : 0
  return {
    level,
    tier,
    nextTier: nextStep ? nextStep.color : null,
    pointsToNextTier: nextStep ? nextStep.threshold - p : null,
    progressToNextTier: nextStep && span > 0 ? Math.min(1, Math.max(0, (p - floor) / span)) : null,
  }
}
