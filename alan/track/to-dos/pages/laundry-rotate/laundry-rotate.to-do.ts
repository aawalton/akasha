import type { ToDo } from "akasha/alan/track/to-dos/to-do.page-type.types.ts"

export const laundryRotate = {
  id: "019db533-f381-7ac2-93d3-45cbf41b34dd",
  type: "to-do",
  slug: "laundry-rotate",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-28",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 41,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-14T12:31:42.814Z",
} as const satisfies ToDo
