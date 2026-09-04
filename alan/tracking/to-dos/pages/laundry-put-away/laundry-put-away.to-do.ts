import type { ToDo } from "../../to-do.page-type.ts"

export const laundryPutAway = {
  id: "019db533-f381-7a7c-bebf-ada866310acc",
  pageTypeSlug: "to-do",
  slug: "laundry-put-away",
  title: "Laundry - Put Away",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 52,
  toDoValueSlug: "health",
} as const satisfies ToDo
