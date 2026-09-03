import type { SelectProperty } from "@akasha/pages-system/select-property"

export const identityStatementRank = {
  id: "01a06589-d12a-743a-8694-bd9f4d4f0a91",
  pageTypeSlug: "select-property",
  slug: "identity-statement-rank",
  propertySlug: "identity-statement-rank",
  definition: "how hard this statement is to hold",
  values: ["s-rank", "a-rank", "b-rank", "c-rank", "d-rank"],
} as const satisfies SelectProperty

export type IdentityStatementRank = (typeof identityStatementRank.values)[number]
