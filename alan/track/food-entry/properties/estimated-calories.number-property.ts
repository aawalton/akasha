import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const estimatedCalories = {
  id: "01a065a3-6e8b-7d6f-9ef1-ffd2201866f6",
  type: "page-type/number-property",
  slug: "estimated-calories",
  propertySlug: "estimated-calories",
  definition: "an estimate of the calories in something Alan has eaten",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calorie estimate is captured by judgment.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T05:00:04.619Z",
  updatedAt: "2026-10-30T16:46:31.530Z",
} as const satisfies NumberProperty
