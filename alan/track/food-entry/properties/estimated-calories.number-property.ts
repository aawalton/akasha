import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const estimatedCalories = {
  id: "01a065a3-6e8b-7d6f-9ef1-ffd2201866f6",
  type: "page-type/number-property",
  slug: "estimated-calories",
  propertySlug: "estimated-calories",
  definition: "the calories a thing eaten was reckoned to hold",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calorie estimate is captured by judgment.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
