import type { ToDo } from "../../to-do.page-type.ts"

export const takeOutTrash = {
  id: "019db533-f381-777a-a057-ad3fc897730f",
  pageTypeSlug: "to-do",
  slug: "take-out-trash",
  title: "Take out Trash",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-07",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TU,SA",
  toDoSortOrder: 35,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-08-18T23:54:03.635Z",
} as const satisfies ToDo
