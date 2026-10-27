import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const laundryPutAway = {
  id: "019db533-f381-7a7c-bebf-ada866310acc",
  type: "page-type/to-do",
  slug: "laundry-put-away",
  title: "Laundry - Put Away",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 52,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-12T16:42:27.964Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
