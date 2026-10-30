import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const chessGame = {
  id: "01a0685f-3f4b-74e4-afe7-966bdea9a9c1",
  type: "page-type/relation-property",
  slug: "chess-game",
  propertySlug: "chess-game",
  definition: "the game an agent goes through",
  targetPageType: "page-type/chess-game",
  types: "ts",
  createdAt: "2026-09-03T17:44:27.723Z",
  updatedAt: "2026-10-30T15:12:28.239Z",
} as const satisfies RelationProperty
