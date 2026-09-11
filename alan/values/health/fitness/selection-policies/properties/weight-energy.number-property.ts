import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const weightEnergy = {
  id: "01a06865-7f45-78ee-92be-b410fe8643ee",
  type: "number-property",
  slug: "weight-energy",
  propertySlug: "weight-energy",
  definition: "how much having energy on the day counts when a movement is weighed",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
