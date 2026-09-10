import type { ToDo } from "../../to-do.page-type.types.ts"

export const takeOutTrash = {
  id: "019db533-f381-777a-a057-ad3fc897730f",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "take-out-trash",
  title: "Take out Trash",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-10",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU,SA",
  toDoSortOrder: 35,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T16:06:43.652Z",
} as const satisfies ToDo
