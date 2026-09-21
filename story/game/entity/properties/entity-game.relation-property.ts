import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const entityGame = {
  id: "01a0c632-2e35-7453-98a5-6717ddf25829",
  type: "page-type/relation-property",
  slug: "entity-game",
  propertySlug: "game",
  definition: "the game whose world holds this",
  targetPageType: "page-type/game",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a game's world holds names that game rather than being listed on it.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
