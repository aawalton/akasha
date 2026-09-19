import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  type: "page-type/to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-26",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-19T13:45:21.397Z",
} as const satisfies ToDo
