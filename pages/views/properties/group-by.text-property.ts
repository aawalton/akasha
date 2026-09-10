import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type GroupBy = string

export const groupBy = {
  id: "01a0680d-4d00-7007-9d51-8b3f7a2c4108",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "group-by",
  propertySlug: "group-by",
  definition: "the property a view gathers its pages under",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
