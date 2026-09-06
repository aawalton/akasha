import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWakeDay } from "../wake-day.page-type.worked.ts"

const SESSIONS = "wake-day-slug"

type Moved = { readonly sessionVolume?: number }

// EACH SESSION IS ASKED WHAT THAT SESSION MOVED. The sets are counted once, on their own pages,
// and this file only adds up what the sessions answer.
export const work: Work<WorkedWakeDay, number> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Moved>(SESSIONS)) total += one.sessionVolume ?? 0
  return Math.round(total)
}
