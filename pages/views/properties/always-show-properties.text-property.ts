import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type AlwaysShowProperties = List<string>

export const alwaysShowProperties = {
  id: "01a0680d-4d00-700b-9a37-5b1d8c6e410c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "always-show-properties",
  propertySlug: "always-show-properties",
  definition: "the properties a view draws even where a page has no value for them",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
