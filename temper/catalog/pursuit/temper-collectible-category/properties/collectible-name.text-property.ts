import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const collectibleName = {
  id: "01a06165-ae0e-7001-a94f-12db8229907f",
  type: "page-type/text-property",
  slug: "collectible-name",
  propertySlug: "collectible-name",
  definition: "the name the game gives a collectible",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
