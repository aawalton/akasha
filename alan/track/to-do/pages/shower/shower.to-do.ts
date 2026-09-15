import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const shower = {
  id: "019db533-f381-770f-82fe-2cde8c153ec6",
  type: "page-type/to-do",
  slug: "shower",
  title: "Shower",
  toDoAnchoredFromCompletion: true,
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-16",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 46,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-15T22:11:04.526Z",
} as const satisfies ToDo
