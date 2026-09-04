import type { TextProperty } from "@akasha/pages-system/text-property"

export type OfferText = string

export const offerText = {
  id: "01a06585-5fc5-7dd9-9b54-233316a199d7",
  pageTypeSlug: "text-property",
  slug: "offer-text",
  propertySlug: "offer-text",
  definition: "what the offer gives, as the source words it",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
