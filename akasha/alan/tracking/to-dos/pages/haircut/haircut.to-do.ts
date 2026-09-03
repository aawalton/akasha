import type { ToDo } from "../../to-do.page-type.ts"

export const haircut = {
  id: "019db533-f381-76c9-b024-858f4cbd828c",
  pageTypeSlug: "to-do",
  slug: "haircut",
  title: "Haircut",
  toDoCategory: "health",
  difficulty: "major",
  toDoDueDate: "2026-09-04",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=WEEKLY;INTERVAL=6",
  toDoSortOrder: 53,
  toDoValueSlug: "health",
} as const satisfies ToDo
