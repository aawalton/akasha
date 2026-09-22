import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const pointUnit = {
  id: "01a06841-a113-7165-ba2c-70e40a2ecf42",
  type: "page-type/text-property",
  slug: "point-unit",
  propertySlug: "point-unit",
  definition: "what earns a point in an attribute",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
