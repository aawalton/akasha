import type { ToDo } from "../../to-do.page-type.types.ts"

export const sanitizeFixtures = {
  id: "019db533-f381-7ba6-9fae-8668eb50d691",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "sanitize-fixtures",
  title: "Sanitize fixtures",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-28",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 28,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T12:01:38.491Z",
} as const satisfies ToDo
