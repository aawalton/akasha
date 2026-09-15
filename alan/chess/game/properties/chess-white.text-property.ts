import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const chessWhite = {
  id: "01a06582-bd62-76ba-82e2-041212687bdc",
  type: "page-type/text-property",
  slug: "chess-white",
  propertySlug: "white",
  definition: "who played the white pieces",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
