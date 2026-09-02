import type { PageQuery } from "../page-query.page-type.ts"

export const optionListsAll = {
  id: "01a063f9-220b-7164-b8bd-afe68bf17c64",
  pageTypeSlug: "page-query",
  slug: "option-lists-all",
  asksOfSlug: "option-list",
  keys: ["slug", "title", "options"],
} as const satisfies PageQuery
