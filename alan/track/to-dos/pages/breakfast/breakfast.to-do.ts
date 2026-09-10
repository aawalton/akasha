import type { ToDo } from "../../to-do.page-type.types.ts"

export const breakfast = {
  id: "019db533-f381-7721-93e3-a824e4ba6b9c",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "breakfast",
  title: "Breakfast",
  toDoCategory: "health",
  toDoDueDate: "2026-09-11",
  toDoPriority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 40,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-10T20:53:39.597Z",
} as const satisfies ToDo
