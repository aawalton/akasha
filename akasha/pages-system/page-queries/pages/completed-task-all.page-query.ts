import type { PageQuery } from "../page-query.page-type.ts"

export const completedTaskAll = {
  id: "01a063f9-220a-7061-9953-1254c313c439",
  pageTypeSlug: "page-query",
  slug: "completed-task-all",
  asksOfSlug: "completed-task",
  keys: [
    "title",
    "completed-at",
    "to-do-slug",
    "value-slug",
    "category",
    "priority",
    "due-date",
    "recurrence",
    "anchored-from-completion",
    "description",
  ],
  sortBy: "completed-at",
} as const satisfies PageQuery
