import type { PageQuery } from "../page-query.page-type.ts"

export const relationshipsAll = {
  id: "01a063f9-220c-7b2f-a8ed-7b2074daf34e",
  pageTypeSlug: "page-query",
  slug: "relationships-all",
  asksOfSlug: "relationship",
  keys: [
    "title",
    "relationshipCurrentCircle",
    "relationshipCommitment",
    "relationshipConnection",
    "relationshipImpact",
    "relationshipInterest",
    "relationship-email",
    "relationshipPhone",
  ],
} as const satisfies PageQuery
