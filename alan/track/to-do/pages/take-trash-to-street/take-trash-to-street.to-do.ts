import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const takeTrashToStreet = {
  id: "019db533-f381-7768-a917-b4edeb2c059a",
  type: "page-type/to-do",
  slug: "take-trash-to-street",
  title: "Take trash to street",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-22",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU",
  toDoSortOrder: 36,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-15T22:28:09.752Z",
} as const satisfies ToDo
