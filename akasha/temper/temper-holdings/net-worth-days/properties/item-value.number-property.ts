import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ItemValue = number

export const itemValue = {
  id: "01a05fcb-fd34-71a0-9352-343879d840e4",
  pageTypeSlug: "number-property",
  slug: "item-value",
  propertySlug: "item-value",
  definition: "what the items an account holds are worth in gold",
  max: null,
} as const satisfies NumberProperty
