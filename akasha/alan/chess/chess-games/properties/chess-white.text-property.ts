import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChessWhite = string

export const chessWhite = {
  id: "01a06582-bd62-76ba-82e2-041212687bdc",
  pageTypeSlug: "text-property",
  slug: "chess-white",
  propertySlug: "white",
  definition: "who played the white pieces",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
