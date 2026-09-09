import type { TextProperty } from "@akasha/pages/text-property"

export type HolderQuote = string

export const holderQuote = {
  id: "01a06558-a991-746b-a038-ee071f220b04",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "holder-quote",
  propertySlug: "holder-quote",
  definition: "the sentence a holder is read out of",
  maxLength: 1000,
  nameFormat: null,
} as const satisfies TextProperty
