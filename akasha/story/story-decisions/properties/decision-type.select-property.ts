import type { SelectProperty } from "@akasha/pages-system/select-property"

export const decisionType = {
  id: "01a06577-f385-717f-8a5c-553d37a77bab",
  pageTypeSlug: "select-property",
  slug: "decision-type",
  propertySlug: "decision-type",
  definition: "what a decision settled",
  values: ["stat", "other"],
} as const satisfies SelectProperty

export type DecisionType = (typeof decisionType.values)[number]
