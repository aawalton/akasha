import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const takeOutTrash = {
  id: "019db533-f381-777a-a057-ad3fc897730f",
  type: "page-type/to-do",
  slug: "take-out-trash",
  title: "Take out Trash",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU,SA",
  toDoSortOrder: 35,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-25T23:55:08.092Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-25T23:55:12.695Z",
} as const satisfies ToDo
