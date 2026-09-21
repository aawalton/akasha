import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const federalTaxCreditAmount = {
  id: "01a0c545-e318-7834-a82c-8bcccd7364b8",
  type: "page-type/number-property",
  slug: "federal-tax-credit-amount",
  propertySlug: "federal-tax-credit-amount",
  definition: "what the federal clean vehicle credit is worth on this trim, in dollars",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
