import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const trimFingernails = {
  id: "019db533-f381-7a47-8724-3eee911fd0d8",
  type: "page-type/to-do",
  slug: "trim-fingernails",
  title: "Trim Fingernails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-12",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 50,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T11:12:16.932Z",
} as const satisfies ToDo
