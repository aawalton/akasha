import type { UrlProperty } from "akasha/page/url-property/url-property.page-type.types.ts"

export const sourceUrl = {
  id: "01a06583-acfb-79ca-8185-82824c8eef74",
  type: "page-type/url-property",
  slug: "source-url",
  propertySlug: "source-url",
  definition: "where the source shows the place",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
