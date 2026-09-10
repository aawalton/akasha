import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export type ExternalLink = string

export const externalLink = {
  id: "01a063de-2c60-701d-a691-4a8731d32875",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "external-link",
  propertySlug: "external-link",
  definition: "the page at the source a collection was read from",
  maxLength: 200,
} as const satisfies UrlProperty
