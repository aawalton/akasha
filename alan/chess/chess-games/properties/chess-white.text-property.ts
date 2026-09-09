import type { TextProperty } from "@akasha/pages/text-property"

export type ChessWhite = string

export const chessWhite = {
  id: "01a06582-bd62-76ba-82e2-041212687bdc",
  pageTypeSlug: "text-property",
  slug: "chess-white",
  propertySlug: "white",
  definition: "who played the white pieces",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
