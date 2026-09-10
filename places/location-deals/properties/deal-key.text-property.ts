import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type DealKey = string

export const dealKey = {
  id: "01a06585-5fc5-743b-a66b-aa44d040b918",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "deal-key",
  propertySlug: "deal-key",
  definition: "what the source calls the offer",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
