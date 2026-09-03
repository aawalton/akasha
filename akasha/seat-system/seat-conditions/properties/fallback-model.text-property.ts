import type { TextProperty } from "@akasha/pages-system/text-property"

export type FallbackModel = string

export const fallbackModel = {
  id: "01a06861-f664-7a19-85ae-45d05b61fb5b",
  pageTypeSlug: "text-property",
  slug: "fallback-model",
  propertySlug: "fallback-model",
  definition: "the model a seat answers on where the model it asked for will not serve",
  max: 40,
  nameFormatSlug: null,
} as const satisfies TextProperty
