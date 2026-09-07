import type { ToDo } from "../../to-do.page-type.ts"

export const trimFingernails = {
  id: "019db533-f381-7a47-8724-3eee911fd0d8",
  pageTypeSlug: "to-do",
  slug: "trim-fingernails",
  title: "Trim Fingernails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-06",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 50,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-08-10T17:40:45.046Z",
} as const satisfies ToDo
