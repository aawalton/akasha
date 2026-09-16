import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const attributeValue = {
  id: "01a0aa5f-7cce-7766-8bca-9d4677a026ea",
  type: "page-type/text-property",
  slug: "attribute-value",
  propertySlug: "value",
  definition: "the value an attribute holds on an edge",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
