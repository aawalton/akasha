import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const encounterEntities = {
  id: "01a0c647-77ab-7f56-928d-9a09312c406d",
  type: "page-type/relation-property",
  slug: "encounter-entities",
  propertySlug: "entities",
  definition: "who or what an encounter puts in front of the player",
  targetPageType: "page-type/game-entity",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity met in two encounters is one page named twice.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
