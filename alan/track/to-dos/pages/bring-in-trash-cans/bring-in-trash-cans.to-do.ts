import type { ToDo } from "../../to-do.page-type.ts"

export const bringInTrashCans = {
  id: "019db533-f381-7757-b165-7eec39fd6a8f",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "bring-in-trash-cans",
  title: "Bring in trash cans",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-09-10",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=TH",
  toDoSortOrder: 37,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T01:39:01.898Z",
} as const satisfies ToDo
