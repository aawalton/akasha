import type { ToDo } from "../../to-do.page-type.ts"

export const shower = {
  id: "019db533-f381-770f-82fe-2cde8c153ec6",
  pageTypeSlug: "to-do",
  slug: "shower",
  title: "Shower",
  toDoAnchoredFromCompletion: true,
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-08-23",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 46,
  toDoValueSlug: "health",
} as const satisfies ToDo
