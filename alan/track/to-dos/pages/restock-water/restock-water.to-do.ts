import type { ToDo } from "../../to-do.page-type.ts"

export const restockWater = {
  id: "019db533-f381-7b83-a8a2-902051bf09df",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "restock-water",
  title: "Restock water",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-14",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 32,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T01:39:26.483Z",
} as const satisfies ToDo
