import type { PageQuery } from "../page-query.page-type.ts"

export const pageTypeAll = {
  id: "01a063f9-220b-74a7-bc8d-4383c607148e",
  pageTypeSlug: "page-query",
  slug: "page-type-all",
  asksOfSlug: "page-type",
  keys: ["slug", "extends-slug"],
} as const satisfies PageQuery
