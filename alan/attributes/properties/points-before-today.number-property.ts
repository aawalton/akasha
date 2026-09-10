import type { NumberProperty } from "../../../pages/number-properties/number-property.page-type.types.ts"

export type PointsBeforeToday = number

export const pointsBeforeToday = {
  id: "01a08205-3006-72d5-930b-892c6e875b17",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "points-before-today",
  propertySlug: "points-before-today",
  definition: "the points earned over the days before today",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Today's points are no part of this figure.",
    },
    {
      invariantKind: "departure",
      statement: "This figure and today's points together are the total.",
    },
    {
      invariantKind: "departure",
      statement: "A rebuild is what moves this figure on.",
    },
  ],
} as const satisfies NumberProperty
