import type { NumberProperty } from "@akasha/pages-system/number-property"

export type TrainCost = number

export const trainCost = {
  id: "01a06596-f0d5-7003-8178-ccae96a469c6",
  pageTypeSlug: "number-property",
  slug: "train-cost",
  propertySlug: "train-cost",
  definition: "what raising a card the next step costs",
  max: null,
} as const satisfies NumberProperty
