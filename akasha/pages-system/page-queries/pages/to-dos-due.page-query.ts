import type { PageQuery } from "../page-query.page-type.ts"

export const toDosDue = {
  id: "01a063f9-220c-712e-8818-ef1a497aaa70",
  pageTypeSlug: "page-query",
  slug: "to-dos-due",
  asksOfSlug: "to-do",
  keys: ["slug", "title", "due-date", "due-time", "priority", "value-slug", "recurrence"],
} as const satisfies PageQuery
