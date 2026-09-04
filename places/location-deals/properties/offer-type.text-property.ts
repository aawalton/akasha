import type { TextProperty } from "@akasha/pages-system/text-property"

export type OfferType = string

export const offerType = {
  id: "01a06585-5fc5-7b2f-b891-ef345969b90c",
  pageTypeSlug: "text-property",
  slug: "offer-type",
  propertySlug: "offer-type",
  definition: "the shape of what the offer gives",
  max: 20,
  nameFormatSlug: null,
} as const satisfies TextProperty
