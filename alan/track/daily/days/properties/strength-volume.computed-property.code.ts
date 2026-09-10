import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

const SETS = "day"

type Moved = { readonly setVolume?: number }

export const work: Work<WorkedDay, number> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Moved>(SETS)) total += one.setVolume ?? 0
  return Math.round(total)
}
