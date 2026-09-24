import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const loreCollectionBookTotal = {
  id: "01a0d5da-b59f-7d64-bd6c-802dd7c89958",
  type: "page-type/number-property",
  slug: "lore-collection-book-total",
  propertySlug: "book-total",
  definition: "how many books the game's lore library says a collection holds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
