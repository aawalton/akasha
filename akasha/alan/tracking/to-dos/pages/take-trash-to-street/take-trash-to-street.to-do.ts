import type { ToDo } from "../../to-do.page-type.ts"

export const takeTrashToStreet = {
  id: "019db533-f381-7768-a917-b4edeb2c059a",
  pageTypeSlug: "to-do",
  slug: "take-trash-to-street",
  title: "Take trash to street",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-25",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU",
  toDoSortOrder: 36,
  toDoValueSlug: "health",
} as const satisfies ToDo
