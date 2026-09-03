import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeightEnergy = number

export const weightEnergy = {
  id: "01a06865-7f45-78ee-92be-b410fe8643ee",
  pageTypeSlug: "number-property",
  slug: "weight-energy",
  propertySlug: "weight-energy",
  definition: "how much having energy on the day counts when a movement is weighed",
  max: null,
} as const satisfies NumberProperty
