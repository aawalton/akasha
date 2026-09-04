import type { NumberProperty } from "@akasha/pages-system/number-property"

export type IdentityStatementLevel = number

export const identityStatementLevel = {
  id: "01a0658a-739f-71ab-a331-0a7bca35e0bd",
  pageTypeSlug: "number-property",
  slug: "identity-statement-level",
  propertySlug: "identity-statement-level",
  definition: "how far along the statement is within its rank",
  max: null,
} as const satisfies NumberProperty
