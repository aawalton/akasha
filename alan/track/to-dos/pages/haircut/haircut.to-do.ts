import type { ToDo } from "../../to-do.page-type.types.ts"

export const haircut = {
  id: "019db533-f381-76c9-b024-858f4cbd828c",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "haircut",
  title: "Haircut",
  toDoCategory: "health",
  difficulty: "major",
  toDoDueDate: "2026-10-19",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;INTERVAL=6",
  toDoSortOrder: 53,
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-07T13:09:29.899Z",
} as const satisfies ToDo
