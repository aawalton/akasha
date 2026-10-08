import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const chessGame = {
  id: "01a0685f-3f4b-74e4-afe7-966bdea9a9c1",
  type: "page-type/relation-property",
  slug: "chess-game",
  propertySlug: "chess-game",
  definition: "a session's game",
  targetPageType: "page-type/chess-game",
  types: "ts",
  createdAt: "2026-09-03T17:44:27.723Z",
  updatedAt: "2026-09-22T13:50:37.000Z",
} as const satisfies RelationProperty
