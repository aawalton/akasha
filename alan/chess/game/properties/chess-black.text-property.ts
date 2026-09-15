import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chessBlack = {
  id: "01a06582-bd62-7cd1-b228-cee0f7567643",
  type: "page-type/text-property",
  slug: "chess-black",
  propertySlug: "black",
  definition: "who played the black pieces",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
