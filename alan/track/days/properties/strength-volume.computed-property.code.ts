import type { Work } from "@akasha/pages/computed-property"
import type { WorkedDay } from "../day.page-type.worked.ts"

const SETS = "day"

const SETS_WAS = "day-slug"

type Moved = { readonly setVolume?: number }

export const work: Work<WorkedDay, number> = (_page, reach) => {
  let total = 0
  const sets = [...reach.naming<Moved>(SETS), ...reach.naming<Moved>(SETS_WAS)]
  for (const one of sets) total += one.setVolume ?? 0
  return Math.round(total)
}
