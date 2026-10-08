import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const externalLink = {
  id: "01a063de-2c60-701d-a691-4a8731d32875",
  type: "page-type/url-property",
  slug: "external-link",
  propertySlug: "external-link",
  definition: "the page at a collection's source",
  maxLength: 200,
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-09-22T13:59:16.000Z",
} as const satisfies UrlProperty
