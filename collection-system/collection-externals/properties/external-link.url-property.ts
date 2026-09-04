import type { UrlProperty } from "@akasha/pages-system/url-property"

export type ExternalLink = string

export const externalLink = {
  id: "01a063de-2c60-701d-a691-4a8731d32875",
  pageTypeSlug: "url-property",
  slug: "external-link",
  propertySlug: "external-link",
  definition: "the page at the source a collection was read from",
  max: 200,
} as const satisfies UrlProperty
