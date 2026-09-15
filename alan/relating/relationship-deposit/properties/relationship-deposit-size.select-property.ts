import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipDepositSize = {
  id: "01a0658d-16bc-738e-9d2e-3534cd4e99e1",
  type: "page-type/select-property",
  slug: "relationship-deposit-size",
  propertySlug: "relationship-deposit-size",
  definition: "how much it put in",
  values: ["small", "medium", "large"],
  types: "ts",
} as const satisfies SelectProperty
