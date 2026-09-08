import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.worked.ts"

const SETS = "wake-day-slug"

type Moved = { readonly setVolume?: number }

export const work: Work<WorkedWakeDay, number> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Moved>(SETS)) total += one.setVolume ?? 0
  return Math.round(total)
}
