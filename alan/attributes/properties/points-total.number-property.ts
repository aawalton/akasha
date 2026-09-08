import type { NumberProperty } from "../../../pages/number-properties/number-property.page-type.ts"

export type PointsTotal = number

export const pointsTotal = {
  id: "01a081cb-66ae-7cee-8e11-431ab034165b",
  pageTypeSlug: "number-property",
  slug: "points-total",
  propertySlug: "points-total",
  definition: "the points earned in an attribute since the day it began",
  max: null,
} as const satisfies NumberProperty
