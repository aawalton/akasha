import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreCollectionDescription = {
  id: "01a0d5da-b5a0-7114-922b-b75daae82f54",
  type: "page-type/text-property",
  slug: "lore-collection-description",
  propertySlug: "lore-collection-description",
  definition: "the words the game's lore library says of a collection",
  maxLength: 400,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
