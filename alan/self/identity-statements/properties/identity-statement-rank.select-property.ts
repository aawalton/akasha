import type { SelectProperty } from "@akasha/pages-system/select-property"

export const identityStatementRank = {
  id: "01a0658a-739f-7e10-8159-f1a28e4d3724",
  pageTypeSlug: "select-property",
  slug: "identity-statement-rank",
  propertySlug: "identity-statement-rank",
  definition: "how hard this statement is to hold",
  values: ["s-rank", "a-rank", "b-rank", "c-rank", "d-rank"],
} as const satisfies SelectProperty

export type IdentityStatementRank = (typeof identityStatementRank.values)[number]
