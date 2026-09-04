import type { ToDo } from "../../to-do.page-type.ts"

export const laundryRotate2 = {
  id: "019db533-f381-7ab0-8921-d82b3b8bb4f8",
  pageTypeSlug: "to-do",
  slug: "laundry-rotate-2",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-24",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 45,
  toDoValueSlug: "health",
} as const satisfies ToDo
