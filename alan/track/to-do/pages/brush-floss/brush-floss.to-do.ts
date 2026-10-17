import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const brushFloss = {
  id: "019db533-f381-76ec-81cf-35ca7e59aec8",
  type: "page-type/to-do",
  slug: "brush-floss",
  title: "Brush + Floss",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-10-17",
  priority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 49,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-15T14:00:26.228Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-17T10:05:00.842Z",
} as const satisfies ToDo
