import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type WeightAesthetics = number

export const weightAesthetics = {
  id: "01a06865-7f45-7241-89ac-23fd540bb13d",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "weight-aesthetics",
  propertySlug: "weight-aesthetics",
  definition: "how much looking the part counts when a movement is weighed",
  max: null,
} as const satisfies NumberProperty
