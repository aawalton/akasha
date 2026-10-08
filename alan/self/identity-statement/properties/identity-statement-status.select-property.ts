import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const identityStatementStatus = {
  id: "01a0658a-739f-7ffd-9183-6ff281dfa491",
  type: "page-type/select-property",
  slug: "identity-statement-status",
  propertySlug: "identity-statement-status",
  definition: "how far along this statement is",
  values: ["planned", "in-progress", "current", "deprecated"],
  types: "ts",
  createdAt: "2026-09-03T04:32:47.519Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
