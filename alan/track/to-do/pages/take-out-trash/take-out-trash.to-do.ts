import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const takeOutTrash = {
  id: "019db533-f381-777a-a057-ad3fc897730f",
  type: "page-type/to-do",
  slug: "take-out-trash",
  title: "Take out Trash",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-25",
  priority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU,SA",
  toDoSortOrder: 35,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-20T20:22:01.192Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-25T10:05:00.922Z",
} as const satisfies ToDo
