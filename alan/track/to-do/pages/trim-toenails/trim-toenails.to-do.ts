import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const trimToenails = {
  id: "019db533-f381-7a8d-9269-95dadd19784e",
  type: "page-type/to-do",
  slug: "trim-toenails",
  title: "Trim Toenails",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 51,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T18:49:28.854Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
