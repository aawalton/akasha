import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import {
  LADDER,
  levelOf,
} from "akasha/persona/closeness-level/modules/climbing/closeness-level-climbing.computed-property-module.code.ts"
import type { WorldRelationshipLevel } from "akasha/story/world/mechanics/relationships/properties/world-relationship-level.computed-property.types.ts"

type Pointed = { readonly relationshipPoints?: number }

type Rung = { readonly pointsToHere?: number }

export const work: Work<Pointed, WorldRelationshipLevel> = (page, reach) => {
  if (typeof page.relationshipPoints !== "number") return null
  const level = levelOf(
    page.relationshipPoints,
    (rung) => reach.target<Rung>(`${LADDER}${rung}`)?.pointsToHere ?? null
  )
  return level === 0 ? null : (`${LADDER}${level}` as WorldRelationshipLevel)
}
