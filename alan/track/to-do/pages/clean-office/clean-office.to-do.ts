import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  type: "page-type/to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-03",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-26T13:13:43.934Z",
} as const satisfies ToDo
