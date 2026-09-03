import type { ToDo } from "../../to-do.page-type.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  pageTypeSlug: "to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-23",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValueSlug: "health",
} as const satisfies ToDo
