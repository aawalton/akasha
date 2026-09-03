import type { NumberProperty } from "@akasha/pages-system/number-property"

export type EstimatedCalories = number

export const estimatedCalories = {
  id: "01a065a3-6e8b-7d6f-9ef1-ffd2201866f6",
  pageTypeSlug: "number-property",
  slug: "estimated-calories",
  propertySlug: "estimated-calories",
  definition: "the calories one thing eaten was reckoned to hold",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calorie estimate is captured by judgment.",
    },
  ],
} as const satisfies NumberProperty
