import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const bringInTrashCans = {
  id: "019db533-f381-7757-b165-7eec39fd6a8f",
  type: "page-type/to-do",
  slug: "bring-in-trash-cans",
  title: "Bring in trash cans",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-17",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TH",
  toDoSortOrder: 37,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T11:12:08.485Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-17T10:05:00.842Z",
} as const satisfies ToDo
