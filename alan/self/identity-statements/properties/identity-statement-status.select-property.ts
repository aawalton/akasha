import type { SelectProperty } from "@akasha/pages-system/select-property"

export const identityStatementStatus = {
  id: "01a0658a-739f-7ffd-9183-6ff281dfa491",
  pageTypeSlug: "select-property",
  slug: "identity-statement-status",
  propertySlug: "identity-statement-status",
  definition: "how far along this statement is",
  values: ["planned", "in-progress", "current", "deprecated"],
} as const satisfies SelectProperty

export type IdentityStatementStatus = (typeof identityStatementStatus.values)[number]
