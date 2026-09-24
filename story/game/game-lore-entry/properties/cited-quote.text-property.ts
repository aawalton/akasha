import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const citedQuote = {
  id: "01a0c94a-0f66-77dc-a2ee-ab183cf8627d",
  type: "page-type/text-property",
  slug: "cited-quote",
  propertySlug: "quote",
  definition: "the words in a turn that a lore entry was drawn from",
  maxLength: 2000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
