import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const cleanToilet = {
  id: "019db533-f381-7bb8-b68b-875481fd1f03",
  type: "page-type/to-do",
  slug: "clean-toilet",
  title: "Clean toilet",
  toDoCategory: "health",
  difficulty: "hard",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 30,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T14:41:10.889Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
