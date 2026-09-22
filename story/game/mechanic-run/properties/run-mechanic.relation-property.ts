import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const runMechanic = {
  id: "01a0c951-f200-7d32-bac4-e1b2bab05944",
  type: "page-type/relation-property",
  slug: "run-mechanic",
  propertySlug: "mechanic",
  definition: "the mechanic a run ran",
  targetPageType: "page-type/game-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A run made before the mechanics were pages names none.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
