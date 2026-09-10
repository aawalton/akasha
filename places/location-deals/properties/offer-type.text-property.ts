import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type OfferType = string

export const offerType = {
  id: "01a06585-5fc5-7b2f-b891-ef345969b90c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "offer-type",
  propertySlug: "offer-type",
  definition: "the shape of what the offer gives",
  maxLength: 20,
  nameFormat: null,
} as const satisfies TextProperty
