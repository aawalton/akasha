import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WeightAesthetics = number

export const weightAesthetics = {
  id: "01a06865-7f45-7241-89ac-23fd540bb13d",
  pageTypeSlug: "number-property",
  slug: "weight-aesthetics",
  propertySlug: "weight-aesthetics",
  definition: "how much looking the part counts when a movement is weighed",
  max: null,
} as const satisfies NumberProperty
