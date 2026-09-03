import type { SelectProperty } from "@akasha/pages-system/select-property"

export const relationshipDepositSize = {
  id: "01a0658d-16bc-738e-9d2e-3534cd4e99e1",
  pageTypeSlug: "select-property",
  slug: "relationship-deposit-size",
  propertySlug: "relationship-deposit-size",
  definition: "how much it put in",
  values: ["small", "medium", "large"],
} as const satisfies SelectProperty

export type RelationshipDepositSize = (typeof relationshipDepositSize.values)[number]
