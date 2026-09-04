import type { PageQuery } from "../page-query.page-type.ts"

export const personaDaysAll = {
  id: "01a063f9-220c-77d4-b75c-14ec865135b6",
  pageTypeSlug: "page-query",
  slug: "persona-days-all",
  asksOfSlug: "persona-day",
  keys: [
    "persona-slug",
    "date",
    "value-slug",
    "source-points",
    "green-day-points",
    "green-day-fraction",
  ],
} as const satisfies PageQuery
