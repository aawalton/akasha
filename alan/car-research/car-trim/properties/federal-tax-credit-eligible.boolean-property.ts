import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const federalTaxCreditEligible = {
  id: "01a0c542-3ccc-7c48-b3f9-98fd4ce16733",
  type: "page-type/boolean-property",
  slug: "federal-tax-credit-eligible",
  propertySlug: "federal-tax-credit-eligible",
  definition: "whether the federal clean vehicle credit reaches this trim",
  types: "ts",
} as const satisfies BooleanProperty
