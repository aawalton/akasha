import type { Work } from "akasha/page/computed-property/computed-property.page-type.ts"
import {
  LADDER,
  levelOf,
} from "akasha/persona/closeness-level/modules/climbing/closeness-level-climbing.computed-property-module.code.ts"
import type { PersonaRelationshipLevel } from "akasha/persona/properties/persona-relationship-level.computed-property.types.ts"

type Totalled = { readonly pointsTotal?: number }

type Rung = { readonly pointsToHere?: number }

export const work: Work<Totalled, PersonaRelationshipLevel> = (page, reach) =>
  typeof page.pointsTotal === "number"
    ? levelOf(
        page.pointsTotal,
        (level) => reach.target<Rung>(`${LADDER}${level}`)?.pointsToHere ?? null
      )
    : 0
