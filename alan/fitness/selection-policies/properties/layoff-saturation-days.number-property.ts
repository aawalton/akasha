import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LayoffSaturationDays = number

export const layoffSaturationDays = {
  id: "01a06865-7f46-720e-adae-0de43a7b2070",
  pageTypeSlug: "number-property",
  slug: "layoff-saturation-days",
  propertySlug: "layoff-saturation-days",
  definition: "how many days off a movement takes before the cut stops growing",
  max: null,
} as const satisfies NumberProperty
