import type { NumberProperty } from "../../number-property/number-property.page-type.ts"

export type Total = number

export const total = {
  id: "01a04ea7-6b2d-773d-bf62-933712b6d01c",
  pageTypeSlug: "number-property",
  slug: "total",
  propertySlug: "total",
  definition: "the most a list's values may run to together, in characters",
  max: null,
} as const satisfies NumberProperty
