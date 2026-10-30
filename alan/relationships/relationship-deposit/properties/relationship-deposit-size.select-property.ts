import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const relationshipDepositSize = {
  id: "01a0658d-16bc-738e-9d2e-3534cd4e99e1",
  type: "page-type/select-property",
  slug: "relationship-deposit-size",
  propertySlug: "relationship-deposit-size",
  definition: "the size of a relationship deposit",
  values: ["small", "medium", "large"],
  types: "ts",
  createdAt: "2026-09-03T04:35:40.348Z",
  updatedAt: "2026-10-30T16:23:55.535Z",
} as const satisfies SelectProperty
