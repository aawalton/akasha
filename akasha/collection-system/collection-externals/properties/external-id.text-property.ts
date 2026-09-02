import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExternalId = string

export const externalId = {
  id: "01a063de-2c60-701c-a29a-210d22f0ac68",
  pageTypeSlug: "text-property",
  slug: "external-id",
  propertySlug: "external-id",
  definition: "the id the source gives a collection",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
