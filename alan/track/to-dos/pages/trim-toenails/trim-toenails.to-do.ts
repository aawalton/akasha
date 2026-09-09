import type { ToDo } from "../../to-do.page-type.ts"

export const trimToenails = {
  id: "019db533-f381-7a8d-9269-95dadd19784e",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "trim-toenails",
  title: "Trim Toenails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-28",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 51,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T13:29:20.100Z",
} as const satisfies ToDo
