import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const worldRelationshipLevel = {
  id: "01a0de40-70c2-7965-8757-30658bc2f9ba",
  type: "page-type/computed-property",
  slug: "world-relationship-level",
  propertySlug: "relationship-level",
  definition: "the rung of the closeness ladder a relationship's points have reached",
  holds: "relation",
  targetPageType: "page-type/closeness-level",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship climbs the closeness ladder a persona climbs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship short of the first rung has no level.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
