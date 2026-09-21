import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const laundryStartLoad = {
  id: "019db533-f381-7b71-93e6-d2f319751778",
  type: "page-type/to-do",
  slug: "laundry-start-load",
  title: "Laundry - Start Load",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-21",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 34,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-14T12:31:43.244Z",
} as const satisfies ToDo
