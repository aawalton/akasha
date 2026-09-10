import type { ToDo } from "../../to-do.page-type.types.ts"

export const vyvanse = {
  id: "019ee9e5-849b-77fd-afca-ec414c6fbbfb",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "vyvanse",
  title: "Vyvanse",
  difficulty: "trivial",
  toDoDueDate: "2026-09-09",
  dueTime: "06:00",
  toDoPriority: "p1",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-08T12:54:04.880Z",
} as const satisfies ToDo
