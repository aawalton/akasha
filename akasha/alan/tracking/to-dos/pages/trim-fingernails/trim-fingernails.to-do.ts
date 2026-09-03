import type { ToDo } from "../../to-do.page-type.ts"

export const trimFingernails = {
  id: "019db533-f381-7a47-8724-3eee911fd0d8",
  pageTypeSlug: "to-do",
  slug: "trim-fingernails",
  title: "Trim Fingernails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 50,
  toDoValueSlug: "health",
} as const satisfies ToDo
