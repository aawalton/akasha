import type { Work } from "@akasha/pages-system/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.ts"

const NO_RUNG = 0

const RUNGS = [
  { from: 24, rung: 4 },
  { from: 18, rung: 3 },
  { from: 12, rung: 2 },
  { from: 6, rung: 1 },
] as const

export const work: Work<WorkedWakeDay, number> = (page) => {
  const levels = [
    page.faithLevel,
    page.loveLevel,
    page.healthLevel,
    page.learnLevel,
    page.funLevel,
    page.wealthLevel,
  ]
  let total = 0
  for (const level of levels) {
    // A level that is not there leaves the six unsummed, and no rung is reached.
    if (typeof level !== "number") return NO_RUNG
    total += level
  }
  for (const { from, rung } of RUNGS) if (total >= from) return rung
  return NO_RUNG
}
