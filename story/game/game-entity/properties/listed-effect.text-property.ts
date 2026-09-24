import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const listedEffect = {
  id: "01a0c637-26f9-730a-854e-d110b9bb1e92",
  type: "page-type/text-property",
  slug: "listed-effect",
  propertySlug: "effect",
  definition: "what one of the things in a page's list does in play, in the game's own words",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
