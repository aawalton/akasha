import type { TextProperty } from "../../../pages-system/text-properties/text-property.page-type.ts"

export type PointUnit = string

export const pointUnit = {
  id: "01a06841-a113-7165-ba2c-70e40a2ecf42",
  pageTypeSlug: "text-property",
  slug: "point-unit",
  propertySlug: "point-unit",
  definition: "what earns one point in an attribute",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
