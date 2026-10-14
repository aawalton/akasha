import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const breakfast = {
  id: "019db533-f381-7721-93e3-a824e4ba6b9c",
  type: "page-type/to-do",
  slug: "breakfast",
  title: "Breakfast",
  toDoCategory: "health",
  toDoDueDate: "2026-10-15",
  priority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 40,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-14T12:42:26.134Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-14T12:42:27.316Z",
} as const satisfies ToDo
