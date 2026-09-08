import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

const NO_RUNG = 0

const RUNGS = [
  { from: 24, rung: 4 },
  { from: 18, rung: 3 },
  { from: 12, rung: 2 },
  { from: 6, rung: 1 },
] as const

export const work: Work<WorkedDay, number> = (page) => {
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
    if (typeof level !== "number") return NO_RUNG
    total += level
  }
  for (const { from, rung } of RUNGS) if (total >= from) return rung
  return NO_RUNG
}
