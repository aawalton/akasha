import type { PageQuery } from "../page-query.page-type.ts"

export const identityStatementsAll = {
  id: "01a063f9-220b-7f15-8e30-f97424ac5a9a",
  pageTypeSlug: "page-query",
  slug: "identity-statements-all",
  asksOfSlug: "identity-statement",
  keys: [
    "title",
    "identityStatementStatus",
    "identityStatementRank",
    "about",
    "identityStatementLevel",
    "identityStatementValueSlug",
  ],
} as const satisfies PageQuery
