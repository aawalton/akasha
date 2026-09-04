import type { ToDo } from "../../to-do.page-type.ts"

export const trimToenails = {
  id: "019db533-f381-7a8d-9269-95dadd19784e",
  pageTypeSlug: "to-do",
  slug: "trim-toenails",
  title: "Trim Toenails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 51,
  toDoValueSlug: "health",
} as const satisfies ToDo
