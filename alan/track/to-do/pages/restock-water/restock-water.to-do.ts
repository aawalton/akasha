import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const restockWater = {
  id: "019db533-f381-7b83-a8a2-902051bf09df",
  type: "page-type/to-do",
  slug: "restock-water",
  title: "Restock water",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-28",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 32,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-15T22:11:02.959Z",
} as const satisfies ToDo
