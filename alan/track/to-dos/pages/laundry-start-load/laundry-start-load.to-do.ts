import type { ToDo } from "../../to-do.page-type.ts"

export const laundryStartLoad = {
  id: "019db533-f381-7b71-93e6-d2f319751778",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "laundry-start-load",
  title: "Laundry - Start Load",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-14",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 34,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T13:09:26.052Z",
} as const satisfies ToDo
