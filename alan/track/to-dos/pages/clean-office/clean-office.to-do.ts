import type { ToDo } from "../../to-do.page-type.types.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-12",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T16:06:42.227Z",
} as const satisfies ToDo
