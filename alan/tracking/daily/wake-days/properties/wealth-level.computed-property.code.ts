import type { Work } from "@akasha/pages-system/computed-property"
import type { WakeDay } from "../wake-day.page-type.ts"

const NO_RUNG = 0

const RUNGS = [
  { from: 2, rung: 4 },
  { from: 1, rung: 3 },
  { from: 0.5, rung: 2 },
  { from: 0.25, rung: 1 },
] as const

export const work: Work<WakeDay, number> = (page) => {
  const points = page.wealthPoints
  if (points === undefined) return NO_RUNG
  for (const { from, rung } of RUNGS) if (points >= from) return rung
  return NO_RUNG
}
