import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const groupBy = {
  id: "01a0680d-4d00-7007-9d51-8b3f7a2c4108",
  type: "page-type/text-property",
  slug: "group-by",
  propertySlug: "group-by",
  definition: "a view's grouping property",
  namesAPropertyKey: true,
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
