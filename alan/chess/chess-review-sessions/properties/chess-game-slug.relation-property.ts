import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ChessGameSlug = Slug

export const chessGameSlug = {
  id: "01a0685f-3f4b-74e4-afe7-966bdea9a9c1",
  pageTypeSlug: "relation-property",
  slug: "chess-game-slug",
  propertySlug: "chess-game-slug",
  definition: "the game a session stepped through",
  targetPageTypeSlug: "page-type/chess-game",
} as const satisfies RelationProperty
