import type { ToDo } from "../../to-do.page-type.ts"

export const sanitizeFixtures = {
  id: "019db533-f381-7ba6-9fae-8668eb50d691",
  pageTypeSlug: "to-do",
  slug: "sanitize-fixtures",
  title: "Sanitize fixtures",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 28,
  toDoValueSlug: "health",
} as const satisfies ToDo
