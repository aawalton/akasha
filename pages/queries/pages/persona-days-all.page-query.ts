import type { PageQuery } from "../page-query.page-type.ts"

export const personaDaysAll = {
  id: "01a063f9-220c-77d4-b75c-14ec865135b6",
  pageTypeSlug: "page-query",
  slug: "persona-days-all",
  asksOfSlug: "persona-day",
  keys: ["personaSlug", "date", "valueSlug", "sourcePoints", "greenDayPoints"],
} as const satisfies PageQuery
