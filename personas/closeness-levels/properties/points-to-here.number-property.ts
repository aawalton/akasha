import type { NumberProperty } from "@akasha/pages/number-property"

export type PointsToHere = number

export const pointsToHere = {
  id: "01a0541b-6a82-72e4-a9db-75b5573cc8ee",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "points-to-here",
  propertySlug: "points-to-here",
  definition: "how many points it takes to reach this rung",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung counts every point earned rather than the points past the rung below.",
    },
    {
      invariantKind: "departure",
      statement: "Points short of the first rung are level 0, where everyone starts.",
    },
  ],
} as const satisfies NumberProperty
