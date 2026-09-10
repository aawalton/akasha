import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type PointsSourcePointField = string

export const pointsSourcePointField = {
  id: "01a060b8-bfaf-7004-943f-bc40141240bf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "points-source-point-field",
  propertySlug: "point-field",
  definition: "which value on each counted thing is the points it is worth",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
