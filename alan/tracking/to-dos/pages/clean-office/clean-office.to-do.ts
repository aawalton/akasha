import type { ToDo } from "../../to-do.page-type.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  pageTypeSlug: "to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-06",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-08-16T21:45:10.329Z",
} as const satisfies ToDo
