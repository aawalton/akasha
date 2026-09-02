import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CurrencyGoldValue = number

export const currencyGoldValue = {
  id: "01a05fcb-fd33-7e8d-89b5-212c9be3fe87",
  pageTypeSlug: "number-property",
  slug: "currency-gold-value",
  propertySlug: "currency-gold-value",
  definition: "what the money an account holds is worth in gold",
  max: null,
} as const satisfies NumberProperty
