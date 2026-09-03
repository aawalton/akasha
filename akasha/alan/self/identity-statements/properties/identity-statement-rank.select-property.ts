import type { SelectProperty } from "@akasha/pages-system/select-property"

export const identityStatementRank = {
  id: "01a06575-c2b8-7b01-bc7a-1b89a3049155",
  pageTypeSlug: "select-property",
  slug: "identity-statement-rank",
  propertySlug: "identity-statement-rank",
  definition: "how hard this statement is to hold",
  values: ["s-rank", "a-rank", "b-rank", "c-rank", "d-rank"],
} as const satisfies SelectProperty

export type IdentityStatementRank = (typeof identityStatementRank.values)[number]
