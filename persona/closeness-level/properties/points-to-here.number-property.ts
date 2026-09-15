import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const pointsToHere = {
  id: "01a0541b-6a82-72e4-a9db-75b5573cc8ee",
  type: "page-type/number-property",
  slug: "points-to-here",
  propertySlug: "points-to-here",
  definition: "how many points it takes to reach this rung",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung counts every point earned rather than the points past the rung below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points short of the first rung are level 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everyone starts at level 0.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
