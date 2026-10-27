import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const laundryRotate2 = {
  id: "019db533-f381-7ab0-8921-d82b3b8bb4f8",
  type: "page-type/to-do",
  slug: "laundry-rotate-2",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 45,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-12T16:30:36.312Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
