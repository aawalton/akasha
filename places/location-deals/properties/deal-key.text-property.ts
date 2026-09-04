import type { TextProperty } from "@akasha/pages-system/text-property"

export type DealKey = string

export const dealKey = {
  id: "01a06585-5fc5-743b-a66b-aa44d040b918",
  pageTypeSlug: "text-property",
  slug: "deal-key",
  propertySlug: "deal-key",
  definition: "what the source calls the offer",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
