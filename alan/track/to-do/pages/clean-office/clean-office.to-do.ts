import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const cleanOffice = {
  id: "019db533-f381-779d-b280-ffed9382c432",
  type: "page-type/to-do",
  slug: "clean-office",
  title: "Clean office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-26",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=SA",
  toDoSortOrder: 27,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-25T23:55:05.725Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-26T14:00:55.849Z",
} as const satisfies ToDo
