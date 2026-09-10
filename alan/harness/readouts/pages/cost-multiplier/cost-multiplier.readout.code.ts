import {
  gapIn,
  multiplierFor,
} from "akasha/alan/track/daily/days/modules/cost-multiplier/cost-multiplier.computed-property-module.code.ts"

const SESSION = "session-tracking"

const END_TIME = "end-time"

const START_TIME = "start-time"

export const OPEN_SESSION = {
  "page-type": SESSION,
  where: { [END_TIME]: { empty: true } },
  "sort-by": START_TIME,
  descending: true,
  limit: 1,
} as const

export function multiplierIn(row: {
  safetyLevel?: unknown
  difficultyLevel?: unknown
}): number | null {
  const gap = gapIn(row)
  if (gap === null) return null
  return multiplierFor(gap)
}
