import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const haircut = {
  id: "019db533-f381-76c9-b024-858f4cbd828c",
  type: "page-type/to-do",
  slug: "haircut",
  title: "Haircut",
  toDoCategory: "health",
  difficulty: "major",
  toDoDueDate: "2026-10-19",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;INTERVAL=6",
  toDoSortOrder: 53,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-07T13:09:29.899Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-09-21T18:27:30.000Z",
} as const satisfies ToDo
