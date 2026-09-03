import type { TextProperty } from "@akasha/pages-system/text-property"

export type AlwaysShowProperties = string

export const alwaysShowProperties = {
  id: "01a0680d-4d00-700b-9a37-5b1d8c6e410c",
  pageTypeSlug: "text-property",
  slug: "always-show-properties",
  propertySlug: "always-show-properties",
  definition: "the properties a view draws even where a page holds no value for them",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
