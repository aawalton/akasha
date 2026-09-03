import type { NumberProperty } from "@akasha/pages-system/number-property"

export type IdentityStatementLevel = number

export const identityStatementLevel = {
  id: "01a06575-c2b8-7b0a-b5ef-2c82a0de9636",
  pageTypeSlug: "number-property",
  slug: "identity-statement-level",
  propertySlug: "identity-statement-level",
  definition: "how far along the statement is within its rank",
  max: null,
} as const satisfies NumberProperty
