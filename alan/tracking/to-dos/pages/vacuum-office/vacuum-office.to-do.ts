import type { ToDo } from "../../to-do.page-type.ts"

export const vacuumOffice = {
  id: "019db533-f381-7b94-9ac8-0903766e6917",
  pageTypeSlug: "to-do",
  slug: "vacuum-office",
  title: "Vacuum office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-07",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 31,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-07-27T20:36:11.901Z",
} as const satisfies ToDo
