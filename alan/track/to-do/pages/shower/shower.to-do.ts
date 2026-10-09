import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const shower = {
  id: "019db533-f381-770f-82fe-2cde8c153ec6",
  type: "page-type/to-do",
  slug: "shower",
  title: "Shower",
  toDoAnchoredFromCompletion: true,
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-10",
  priority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 46,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-09T10:55:48.231Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-09T10:55:48.708Z",
} as const satisfies ToDo
