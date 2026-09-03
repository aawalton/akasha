import type { TextProperty } from "@akasha/pages-system/text-property"

export type HolderQuote = string

export const holderQuote = {
  id: "01a06558-a991-746b-a038-ee071f220b04",
  pageTypeSlug: "text-property",
  slug: "holder-quote",
  propertySlug: "holder-quote",
  definition: "the sentence a holder is read out of",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
