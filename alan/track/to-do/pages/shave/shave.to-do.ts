import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const shave = {
  id: "01a153b8-8b83-70d7-b612-9d5ba73b5706",
  type: "page-type/to-do",
  slug: "shave",
  title: "Shave",
  toDoCategory: "health",
  toDoDueDate: "2026-10-25",
  priority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 47,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-20T20:21:53.809Z",
  createdAt: "2026-10-19T10:32:45.698Z",
  updatedAt: "2026-10-25T10:05:00.922Z",
} as const satisfies ToDo
