import type { TextProperty } from "@akasha/pages-system/text-property"

export type ExternalId = string

export const externalId = {
  id: "01a06243-144b-7000-80d2-932846b85657",
  pageTypeSlug: "text-property",
  slug: "external-id",
  propertySlug: "external-id",
  definition: "the id the provider a page came from gives it",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
