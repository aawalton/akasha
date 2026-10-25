import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const pray = {
  id: "019db533-f381-783b-bd75-0f470dbc9337",
  type: "page-type/to-do",
  slug: "pray",
  title: "Pray",
  toDoCategory: "faith",
  toDoDueDate: "2026-10-26",
  priority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 0,
  toDoValue: "value/faith",
  toDoLastCompletedAt: "2026-10-25T23:55:04.906Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-25T23:55:05.653Z",
} as const satisfies ToDo
