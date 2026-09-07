import type { ToDo } from "../../to-do.page-type.ts"

export const cleanToilet = {
  id: "019db533-f381-7bb8-b68b-875481fd1f03",
  pageTypeSlug: "to-do",
  slug: "clean-toilet",
  title: "Clean toilet",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-09-07",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 30,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-07-27T20:36:05.130Z",
} as const satisfies ToDo
