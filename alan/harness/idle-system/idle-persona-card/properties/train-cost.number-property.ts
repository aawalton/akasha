import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const trainCost = {
  id: "01a06596-f0d5-7003-8178-ccae96a469c6",
  type: "page-type/number-property",
  slug: "train-cost",
  propertySlug: "train-cost",
  definition: "what raising a card the next step costs",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
