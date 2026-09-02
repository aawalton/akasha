import type { PageQuery } from "../page-query.page-type.ts"

export const relationshipDepositsAll = {
  id: "01a063f9-220c-7d27-ad28-7e5325299e0f",
  pageTypeSlug: "page-query",
  slug: "relationship-deposits-all",
  asksOfSlug: "relationship-deposit",
  keys: ["persona-slug", "relationship-id", "date", "size", "value-slug"],
} as const satisfies PageQuery
