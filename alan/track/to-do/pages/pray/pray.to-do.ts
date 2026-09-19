import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const pray = {
  id: "019db533-f381-783b-bd75-0f470dbc9337",
  type: "page-type/to-do",
  slug: "pray",
  title: "Pray",
  toDoCategory: "faith",
  toDoDueDate: "2026-09-20",
  toDoPriority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 0,
  toDoValue: "value/faith",
  toDoLastCompletedAt: "2026-09-19T13:45:30.803Z",
} as const satisfies ToDo
