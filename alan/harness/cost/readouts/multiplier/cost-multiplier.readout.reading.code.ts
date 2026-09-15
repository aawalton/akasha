import {
  gapIn,
  multiplierFor,
} from "akasha/alan/track/daily/day/modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"

export function multiplierIn(row: {
  safetyLevel?: unknown
  difficultyLevel?: unknown
}): number | null {
  const gap = gapIn(row)
  if (gap === null) return null
  return multiplierFor(gap)
}
