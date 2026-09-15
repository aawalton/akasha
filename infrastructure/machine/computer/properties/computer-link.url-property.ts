import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const computerLink = {
  id: "01a0658c-329a-7e92-a679-6958e243a543",
  type: "page-type/url-property",
  slug: "computer-link",
  propertySlug: "link",
  definition: "where its specification is",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
