import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const externalLink = {
  id: "01a063de-2c60-701d-a691-4a8731d32875",
  type: "page-type/url-property",
  slug: "external-link",
  propertySlug: "external-link",
  definition: "the page at a collection's source",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
