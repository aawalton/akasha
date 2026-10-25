import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const surpriseJen = {
  id: "01a14f1f-440d-7b8e-945e-8fcd0a2c65bb",
  type: "page-type/to-do",
  slug: "surprise-jen",
  title: "Surprise Jen",
  toDoCategory: "love",
  toDoDueDate: "2026-10-25",
  priority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 19,
  toDoValue: "value/love",
  toDoLastCompletedAt: "2026-10-21T22:34:02.968Z",
  createdAt: "2026-10-18T13:06:51.532Z",
  updatedAt: "2026-10-25T10:05:00.922Z",
} as const satisfies ToDo
