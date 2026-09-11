import type { Work } from "akasha/pages/computed-properties/computed-property.page-type.ts"
import type { PersonaRelationshipLevel } from "akasha/personas/properties/persona-relationship-level.computed-property.types.ts"

type Totalled = { readonly pointsTotal?: number }

type Rung = { readonly pointsToHere?: number }

export const LADDER = "closeness-level/level-"

export function levelOf(points: number, rungAt: (level: number) => number | null): number {
  if (!Number.isFinite(points) || points <= 0) return 0
  let level = 0
  for (;;) {
    const rung = rungAt(level + 1)
    if (rung === null || points < rung) return level
    level += 1
  }
}

export const work: Work<Totalled, PersonaRelationshipLevel> = (page, reach) =>
  typeof page.pointsTotal === "number"
    ? levelOf(
        page.pointsTotal,
        (level) => reach.target<Rung>(`${LADDER}${level}`)?.pointsToHere ?? null
      )
    : 0
