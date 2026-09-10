import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ChessBlack = string

export const chessBlack = {
  id: "01a06582-bd62-7cd1-b228-cee0f7567643",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "chess-black",
  propertySlug: "black",
  definition: "who played the black pieces",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
