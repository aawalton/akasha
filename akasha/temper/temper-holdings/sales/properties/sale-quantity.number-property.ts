import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SaleQuantity = number

export const saleQuantity = {
  id: "01a0685d-89aa-724b-b85f-0851f02aaa3c",
  pageTypeSlug: "number-property",
  slug: "sale-quantity",
  propertySlug: "quantity",
  definition: "how many of an item went in one sale",
  max: null,
} as const satisfies NumberProperty
