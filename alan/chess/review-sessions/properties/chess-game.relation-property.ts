import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const chessGame = {
  id: "01a0685f-3f4b-74e4-afe7-966bdea9a9c1",
  type: "relation-property",
  slug: "chess-game",
  propertySlug: "chess-game",
  definition: "the game a session stepped through",
  targetPageType: "page-type/chess-game",
  types: "ts",
} as const satisfies RelationProperty
