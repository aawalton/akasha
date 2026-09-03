import type { NumberProperty } from "@akasha/pages-system/number-property"

export type IdentityStatementLevel = number

export const identityStatementLevel = {
  id: "01a06589-d12a-75d5-aa21-a1251828bec5",
  pageTypeSlug: "number-property",
  slug: "identity-statement-level",
  propertySlug: "identity-statement-level",
  definition: "how far along the statement is within its rank",
  max: null,
} as const satisfies NumberProperty
