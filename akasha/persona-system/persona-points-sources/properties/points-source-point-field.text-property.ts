import type { TextProperty } from "@akasha/pages-system/text-property"

export type PointsSourcePointField = string

export const pointsSourcePointField = {
  id: "01a060b8-bfaf-7004-943f-bc40141240bf",
  pageTypeSlug: "text-property",
  slug: "points-source-point-field",
  propertySlug: "point-field",
  definition: "which value on each counted thing is the points it is worth",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
