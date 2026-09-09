import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type ChessGame = Slug

export const chessGame = {
  id: "01a0685f-3f4b-74e4-afe7-966bdea9a9c1",
  pageTypeSlug: "relation-property",
  slug: "chess-game",
  propertySlug: "chess-game",
  definition: "the game a session stepped through",
  targetPageType: "page-type/chess-game",
} as const satisfies RelationProperty
