import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const sanitizeFixtures = {
  id: "019db533-f381-7ba6-9fae-8668eb50d691",
  type: "page-type/to-do",
  slug: "sanitize-fixtures",
  title: "Sanitize fixtures",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 28,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T14:41:18.135Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
