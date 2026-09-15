import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const breakfast = {
  id: "019db533-f381-7721-93e3-a824e4ba6b9c",
  type: "page-type/to-do",
  slug: "breakfast",
  title: "Breakfast",
  toDoCategory: "health",
  toDoDueDate: "2026-09-16",
  toDoPriority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 40,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-15T22:10:58.585Z",
} as const satisfies ToDo
