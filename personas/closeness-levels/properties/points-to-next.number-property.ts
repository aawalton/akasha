import type { NumberProperty } from "@akasha/pages/number-property"

export type PointsToNext = number

export const pointsToNext = {
  id: "01a0541b-6a83-7beb-9eb1-d13e2108d749",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "points-to-next",
  propertySlug: "points-to-next",
  definition: "how many more points the rung after this one takes",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each rung after the first takes three times what the rung before it took.",
    },
    {
      invariantKind: "departure",
      statement: "The last rung states no points.",
    },
  ],
} as const satisfies NumberProperty
