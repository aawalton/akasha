import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreFacts = {
  id: "01a0d41b-bcc1-7e51-92b3-d984f596a3ac",
  type: "page-type/text-property",
  slug: "lore-facts",
  propertySlug: "facts",
  definition: "the statements a piece of lore makes about its world",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
