import type { PageQuery } from "../page-query.page-type.ts"

export const personaCraftDaysAll = {
  id: "01a063f9-220c-7613-8f1a-880c8e05ce8f",
  pageTypeSlug: "page-query",
  slug: "persona-craft-days-all",
  asksOfSlug: "persona-craft-day",
  keys: [
    "persona-slug",
    "date",
    "value-slug",
    "advance-count",
    "new-persona-count",
    "improvement-count",
  ],
} as const satisfies PageQuery
