import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const restockWater = {
  id: "019db533-f381-7b83-a8a2-902051bf09df",
  type: "page-type/to-do",
  slug: "restock-water",
  title: "Restock water",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-26",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 32,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-12T11:05:43.792Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-12T11:05:44.235Z",
} as const satisfies ToDo
