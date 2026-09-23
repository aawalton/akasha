import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const takeOutTrash = {
  id: "019db533-f381-777a-a057-ad3fc897730f",
  type: "page-type/to-do",
  slug: "take-out-trash",
  title: "Take out Trash",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-26",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU,SA",
  toDoSortOrder: 35,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-23T02:14:24.164Z",
} as const satisfies ToDo
