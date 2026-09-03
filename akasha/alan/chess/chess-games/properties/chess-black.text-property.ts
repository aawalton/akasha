import type { TextProperty } from "@akasha/pages-system/text-property"

export type ChessBlack = string

export const chessBlack = {
  id: "01a06582-bd62-7cd1-b228-cee0f7567643",
  pageTypeSlug: "text-property",
  slug: "chess-black",
  propertySlug: "black",
  definition: "who played the black pieces",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
