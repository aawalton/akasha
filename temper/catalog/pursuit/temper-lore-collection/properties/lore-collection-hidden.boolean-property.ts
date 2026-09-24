import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const loreCollectionHidden = {
  id: "01a0d5da-b5a0-7da0-9153-e9ba22beffb0",
  type: "page-type/boolean-property",
  slug: "lore-collection-hidden",
  propertySlug: "hidden",
  definition: "whether the game's lore library hides a collection from a player",
  types: "ts",
} as const satisfies BooleanProperty
