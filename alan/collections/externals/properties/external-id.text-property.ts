import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ExternalId = string

export const externalId = {
  id: "01a063de-2c60-701c-a29a-210d22f0ac68",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "external-id",
  propertySlug: "external-id",
  definition: "the id the source gives a collection",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
