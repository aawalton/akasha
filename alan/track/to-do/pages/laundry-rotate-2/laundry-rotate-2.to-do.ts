import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const laundryRotate2 = {
  id: "019db533-f381-7ab0-8921-d82b3b8bb4f8",
  type: "page-type/to-do",
  slug: "laundry-rotate-2",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-28",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 45,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-21T16:57:14.874Z",
} as const satisfies ToDo
