import type { PageQuery } from "../page-query.page-type.ts"

export const toDosDue = {
  id: "01a063f9-220c-712e-8818-ef1a497aaa70",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "to-dos-due",
  asksOfSlug: "to-do",
  keys: ["slug", "title", "toDoDueDate", "dueTime", "toDoPriority", "toDoValue", "toDoRecurrence"],
} as const satisfies PageQuery
