import type { SetVolume } from "akasha/alan/value/health/fitness/strength/log/properties/set-volume.computed-property.types.ts"
import type { StrengthLog } from "akasha/alan/value/health/fitness/strength/log/strength-log.page-type.types.ts"
import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import { alan } from "akasha/person/pages/alan/alan.person.ts"
import { person } from "akasha/person/person.page-type.ts"

const LIFTER = `${person.slug}/${alan.slug}` as const

type Loaded = { readonly loadFactor?: number; readonly implementCount?: number }

type Weighed = { readonly bodyweight?: number }

export const work: Work<StrengthLog, SetVolume> = (page, reach) => {
  const named = page.exercise
  const movement = named === undefined ? null : reach.target<Loaded>(named)
  const lifter = reach.target<Weighed>(LIFTER)
  const own = lifter === null ? 0 : (lifter.bodyweight ?? 0)
  const share = movement === null ? 0 : (movement.loadFactor ?? 0)
  const held = movement === null ? 1 : (movement.implementCount ?? 1)
  return ((page.weight ?? 0) * held + share * own) * (page.reps ?? 0)
}
