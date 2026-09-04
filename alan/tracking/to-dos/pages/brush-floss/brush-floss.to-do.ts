import type { ToDo } from "../../to-do.page-type.ts"

export const brushFloss = {
  id: "019db533-f381-76ec-81cf-35ca7e59aec8",
  pageTypeSlug: "to-do",
  slug: "brush-floss",
  title: "Brush + Floss",
  toDoCategory: "health",
  difficulty: "trivial",
  toDoDueDate: "2026-08-23",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 49,
  toDoValueSlug: "health",
} as const satisfies ToDo
