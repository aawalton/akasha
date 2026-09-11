import type { WorkedDay } from "akasha/alan/track/daily/days/day.page-type.ts"
import type { StrengthVolume } from "akasha/alan/track/daily/days/properties/strength-volume.computed-property.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

const SETS = "day"

type Moved = { readonly setVolume?: number }

export const work: Work<WorkedDay, StrengthVolume> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Moved>(SETS)) total += one.setVolume ?? 0
  return Math.round(total)
}
