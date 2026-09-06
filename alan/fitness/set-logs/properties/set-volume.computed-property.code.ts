import type { Work } from "@akasha/pages/computed-property"
import type { WorkedSetLog } from "../set-log.page-type.worked.ts"

const LIFTER = "person/alan"

const MOVEMENT = "exercise/"

type Loaded = { readonly loadFactor?: number; readonly implementCount?: number }

type Weighed = { readonly bodyweight?: number }

// THE FORMULA LIVES HERE AND NOWHERE ELSE. A session's volume and a day's volume both read this
// key rather than counting the reps again, so a change to what a set is worth reaches every total.
// The activity a set states is cardio or mobility, so a set naming any activity is not strength.
export const work: Work<WorkedSetLog, number> = (page, reach) => {
  if (page.isWarmup === true) return 0
  if (page.activityType !== undefined) return 0
  const slug = page.exerciseSlug
  const movement = slug === undefined ? null : reach.target<Loaded>(`${MOVEMENT}${slug}`)
  const lifter = reach.target<Weighed>(LIFTER)
  const own = lifter === null ? 0 : (lifter.bodyweight ?? 0)
  const share = movement === null ? 0 : (movement.loadFactor ?? 0)
  const held = movement === null ? 1 : (movement.implementCount ?? 1)
  return ((page.weight ?? 0) * held + share * own) * (page.reps ?? 0)
}
