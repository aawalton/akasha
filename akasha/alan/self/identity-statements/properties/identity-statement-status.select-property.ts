import type { SelectProperty } from "@akasha/pages-system/select-property"

export const identityStatementStatus = {
  id: "01a06589-d12a-74bc-abb2-1fad00fc5a44",
  pageTypeSlug: "select-property",
  slug: "identity-statement-status",
  propertySlug: "identity-statement-status",
  definition: "how far along this statement is",
  values: ["planned", "in-progress", "current", "deprecated"],
} as const satisfies SelectProperty

export type IdentityStatementStatus = (typeof identityStatementStatus.values)[number]
