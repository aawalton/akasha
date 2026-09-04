import type { NumberProperty } from "../../../pages-system/number-properties/number-property.page-type.ts"

export type LifetimePoints = number

export const lifetimePoints = {
  id: "01a06841-a12b-749f-b587-3b43c8b461be",
  pageTypeSlug: "number-property",
  slug: "lifetime-points",
  propertySlug: "lifetime-points",
  definition: "the points earned in an attribute for all time",
  max: null,
} as const satisfies NumberProperty
