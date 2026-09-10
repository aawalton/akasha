import type { Work } from "@akasha/pages/computed-property"
import type { Day } from "../day.page-type.types.ts"

const NO_RUNG = 0

const RUNGS = [
  { from: 2, rung: 4 },
  { from: 1, rung: 3 },
  { from: 0.5, rung: 2 },
  { from: 0.25, rung: 1 },
] as const

export const work: Work<Day, number> = (page) => {
  const points = page.funPoints
  if (points === undefined) return NO_RUNG
  for (const { from, rung } of RUNGS) if (points >= from) return rung
  return NO_RUNG
}
