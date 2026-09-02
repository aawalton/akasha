import type { PageQuery } from "../page-query.page-type.ts"

export const temperCompletedTaskAll = {
  id: "01a063f9-220c-751e-9568-9a6305c6ef1d",
  pageTypeSlug: "page-query",
  slug: "temper-completed-task-all",
  asksOfSlug: "temper-completed-task",
  keys: [
    "title",
    "task",
    "character",
    "completed-at",
    "due-date",
    "scope",
    "completion-card-id",
    "completion-item-path",
    "rrule-rule",
  ],
} as const satisfies PageQuery
