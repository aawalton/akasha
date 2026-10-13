import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const takeTrashToStreet = {
  id: "019db533-f381-7768-a917-b4edeb2c059a",
  type: "page-type/to-do",
  slug: "take-trash-to-street",
  title: "Take trash to street",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-20",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU",
  toDoSortOrder: 36,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-13T19:11:05.609Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-13T19:11:06.614Z",
} as const satisfies ToDo
