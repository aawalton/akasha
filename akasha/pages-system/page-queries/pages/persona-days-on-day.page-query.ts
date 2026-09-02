import type { PageQuery } from "../page-query.page-type.ts"

export const personaDaysOnDay = {
  id: "01a063f9-220c-7b98-b209-d7e437f2ef8f",
  pageTypeSlug: "page-query",
  slug: "persona-days-on-day",
  asksOfSlug: "persona-day",
  parameters: [{ name: "date", type: "calendar-date" }],
  narrows: [{ key: "date", comparison: "is", values: ["$date"] }],
  keys: ["persona-slug", "date", "points"],
  limit: 1000,
} as const satisfies PageQuery
