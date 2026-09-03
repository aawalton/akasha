import type { ToDo } from "../../to-do.page-type.ts"

export const laundryRotate = {
  id: "019db533-f381-7ac2-93d3-45cbf41b34dd",
  pageTypeSlug: "to-do",
  slug: "laundry-rotate",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 41,
  toDoValueSlug: "health",
} as const satisfies ToDo
