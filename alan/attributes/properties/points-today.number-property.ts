import type { NumberProperty } from "../../../pages/number-properties/number-property.page-type.ts"

export type PointsToday = number

export const pointsToday = {
  id: "01a081cb-7ab3-79c5-aa11-47ce1cbe32cf",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "points-today",
  propertySlug: "points-today",
  definition: "the points earned today",
  max: null,
} as const satisfies NumberProperty
