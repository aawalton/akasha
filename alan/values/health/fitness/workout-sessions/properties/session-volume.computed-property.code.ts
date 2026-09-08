import type { Work } from "@akasha/pages/computed-property"
import type { WorkedWorkoutSession } from "../workout-session.page-type.worked.ts"

const SETS = "session-slug"

type Moved = { readonly setVolume?: number }

export const work: Work<WorkedWorkoutSession, number> = (_page, reach) => {
  let total = 0
  for (const one of reach.naming<Moved>(SETS)) total += one.setVolume ?? 0
  return Math.round(total)
}
