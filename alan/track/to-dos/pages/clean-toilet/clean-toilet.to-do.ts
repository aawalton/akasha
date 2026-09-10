import type { ToDo } from "../../to-do.page-type.types.ts"

export const cleanToilet = {
  id: "019db533-f381-7bb8-b68b-875481fd1f03",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "clean-toilet",
  title: "Clean toilet",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-09-28",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 30,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T12:01:33.319Z",
} as const satisfies ToDo
