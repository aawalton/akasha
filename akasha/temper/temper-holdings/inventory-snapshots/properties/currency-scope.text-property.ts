import type { TextProperty } from "@akasha/pages-system/text-property"

export type CurrencyScope = string

export const currencyScope = {
  id: "01a0675a-f185-7129-990f-a2084aecc2dc",
  pageTypeSlug: "text-property",
  slug: "currency-scope",
  propertySlug: "scope",
  definition: "how widely a purse reaches across an account",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
