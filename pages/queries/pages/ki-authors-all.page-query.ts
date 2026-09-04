import type { PageQuery } from "../page-query.page-type.ts"

export const kiAuthorsAll = {
  id: "01a063f9-220b-7a8c-af57-0fd850e3c6f4",
  pageTypeSlug: "page-query",
  slug: "ki-authors-all",
  asksOfSlug: "ki-author",
  keys: ["slug", "title"],
} as const satisfies PageQuery
