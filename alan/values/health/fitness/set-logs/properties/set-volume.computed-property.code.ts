import type { SetLog } from "akasha/alan/values/health/fitness/set-logs/set-log.page-type.types.ts"
import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"

const LIFTER = "person/alan"

const MOVEMENT = "exercise/"

type Loaded = { readonly loadFactor?: number; readonly implementCount?: number }

type Weighed = { readonly bodyweight?: number }

export const work: Work<SetLog, number> = (page, reach) => {
  if (page.isWarmup === true) return 0
  if (page.activityType !== undefined) return 0
  const slug = page.exercise
  const movement = slug === undefined ? null : reach.target<Loaded>(`${MOVEMENT}${slug}`)
  const lifter = reach.target<Weighed>(LIFTER)
  const own = lifter === null ? 0 : (lifter.bodyweight ?? 0)
  const share = movement === null ? 0 : (movement.loadFactor ?? 0)
  const held = movement === null ? 1 : (movement.implementCount ?? 1)
  return ((page.weight ?? 0) * held + share * own) * (page.reps ?? 0)
}
