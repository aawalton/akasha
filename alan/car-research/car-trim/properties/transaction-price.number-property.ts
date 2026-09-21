import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const transactionPrice = {
  id: "01a0c548-144b-7718-806a-d7ddf468edc8",
  type: "page-type/number-property",
  slug: "transaction-price",
  propertySlug: "transaction-price",
  definition: "what the car is selling for rather than what the maker asks, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
