import type { ToDo } from "akasha/alan/track/to-dos/to-do.page-type.types.ts"

export const breakfast = {
  id: "019db533-f381-7721-93e3-a824e4ba6b9c",
  type: "to-do",
  slug: "breakfast",
  title: "Breakfast",
  toDoCategory: "health",
  toDoDueDate: "2026-09-12",
  toDoPriority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 40,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-12T01:02:18.367Z",
} as const satisfies ToDo
