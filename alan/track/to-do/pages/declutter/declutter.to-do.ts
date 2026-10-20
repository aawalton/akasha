import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const declutter = {
  id: "01a14f1f-8344-787f-b283-95ba123aabd4",
  type: "page-type/to-do",
  slug: "declutter",
  title: "Declutter",
  toDoCategory: "health",
  toDoDueDate: "2026-10-21",
  priority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 38,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-20T20:21:59.727Z",
  createdAt: "2026-10-18T13:07:07.715Z",
  updatedAt: "2026-10-20T20:22:00.155Z",
} as const satisfies ToDo
