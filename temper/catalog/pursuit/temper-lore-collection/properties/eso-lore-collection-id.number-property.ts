import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const esoLoreCollectionId = {
  id: "01a0d5da-b59f-74b2-a543-558455f60ea0",
  type: "page-type/number-property",
  slug: "eso-lore-collection-id",
  propertySlug: "eso-lore-collection-id",
  definition: "the id the game gives a lore collection across every lore category",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
