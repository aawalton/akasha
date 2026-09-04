import type { NumberProperty } from "@akasha/pages-system/number-property"

export type LayoffMaxLoadReduction = number

export const layoffMaxLoadReduction = {
  id: "01a06865-7f45-7e15-ac39-affe43c37b79",
  pageTypeSlug: "number-property",
  slug: "layoff-max-load-reduction",
  propertySlug: "layoff-max-load-reduction",
  definition: "the largest share of a load a layoff takes off",
  max: null,
} as const satisfies NumberProperty
