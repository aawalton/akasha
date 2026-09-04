import type { TextProperty } from "@akasha/pages-system/text-property"

export type GroupBy = string

export const groupBy = {
  id: "01a0680d-4d00-7007-9d51-8b3f7a2c4108",
  pageTypeSlug: "text-property",
  slug: "group-by",
  propertySlug: "group-by",
  definition: "the property a view gathers its pages under",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
