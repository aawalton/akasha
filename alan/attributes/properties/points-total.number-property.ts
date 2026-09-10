import type { NumberProperty } from "../../../pages/number-properties/number-property.page-type.types.ts"

export type PointsTotal = number

export const pointsTotal = {
  id: "01a081cb-66ae-7cee-8e11-431ab034165b",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "points-total",
  propertySlug: "points-total",
  definition: "the points earned since the day counting began",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This figure is kept rather than added up wherever the figure is read.",
    },
  ],
} as const satisfies NumberProperty
