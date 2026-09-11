import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const identityStatementStatus = {
  id: "01a0658a-739f-7ffd-9183-6ff281dfa491",
  type: "select-property",
  slug: "identity-statement-status",
  propertySlug: "identity-statement-status",
  definition: "how far along this statement is",
  values: ["planned", "in-progress", "current", "deprecated"],
  types: "ts",
} as const satisfies SelectProperty
