import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const loreBookMapCount = {
  id: "01a0d5da-b5a0-7bdf-80b6-d22b58e506b6",
  type: "page-type/number-property",
  slug: "lore-book-map-count",
  propertySlug: "map-count",
  definition: "the count the LoreBooks table gives a book on one map",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
