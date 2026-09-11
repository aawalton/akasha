import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const identityStatementRank = {
  id: "01a0658a-739f-7e10-8159-f1a28e4d3724",
  type: "select-property",
  slug: "identity-statement-rank",
  propertySlug: "identity-statement-rank",
  definition: "how hard this statement is to hold",
  values: ["s-rank", "a-rank", "b-rank", "c-rank", "d-rank"],
  types: "ts",
} as const satisfies SelectProperty
