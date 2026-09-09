import type { ToDo } from "../../to-do.page-type.ts"

export const laundryPutAway = {
  id: "019db533-f381-7a7c-bebf-ada866310acc",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "laundry-put-away",
  title: "Laundry - Put Away",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-09-14",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=2MO,4MO",
  toDoSortOrder: 52,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T13:09:24.843Z",
} as const satisfies ToDo
