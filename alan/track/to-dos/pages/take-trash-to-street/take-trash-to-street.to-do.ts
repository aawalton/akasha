import type { ToDo } from "../../to-do.page-type.types.ts"

export const takeTrashToStreet = {
  id: "019db533-f381-7768-a917-b4edeb2c059a",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "take-trash-to-street",
  title: "Take trash to street",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-10",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU",
  toDoSortOrder: 36,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T01:39:37.065Z",
} as const satisfies ToDo
