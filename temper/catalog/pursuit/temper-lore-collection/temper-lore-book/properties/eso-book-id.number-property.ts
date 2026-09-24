import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoBookId = {
  id: "01a0d5da-b5a0-700e-84ab-2ce165f61fd5",
  type: "page-type/number-property",
  slug: "eso-book-id",
  propertySlug: "eso-book-id",
  definition: "the id the game gives a lore book",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
