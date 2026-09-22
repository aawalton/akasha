import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const holderQuote = {
  id: "01a06558-a991-746b-a038-ee071f220b04",
  type: "page-type/text-property",
  slug: "holder-quote",
  propertySlug: "holder-quote",
  definition: "a holder's sentence",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
