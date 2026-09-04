import type { UrlProperty } from "@akasha/pages-system/url-property"

export type SourceUrl = string

export const sourceUrl = {
  id: "01a06583-acfb-79ca-8185-82824c8eef74",
  pageTypeSlug: "url-property",
  slug: "source-url",
  propertySlug: "source-url",
  definition: "where the source shows the place",
  max: 200,
} as const satisfies UrlProperty
