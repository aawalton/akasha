import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const laundryRotate = {
  id: "019db533-f381-7ac2-93d3-45cbf41b34dd",
  type: "page-type/to-do",
  slug: "laundry-rotate",
  title: "Laundry - Rotate",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-12",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 41,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T14:41:12.504Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-08T14:41:14.000Z",
} as const satisfies ToDo
