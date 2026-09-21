import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const entityDice = {
  id: "01a0c63e-5c20-742b-881f-3ab0307d15b1",
  type: "page-type/relation-property",
  slug: "entity-dice",
  propertySlug: "dice",
  definition: "the handful of dice an entity is rolled on",
  targetPageType: "page-type/game-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity naming no handful is rolled on the handful its game names.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
