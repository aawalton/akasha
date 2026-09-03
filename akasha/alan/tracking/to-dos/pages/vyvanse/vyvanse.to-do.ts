import type { ToDo } from "../../to-do.page-type.ts"

export const vyvanse = {
  id: "019ee9e5-849b-77fd-afca-ec414c6fbbfb",
  pageTypeSlug: "to-do",
  slug: "vyvanse",
  title: "Vyvanse",
  difficulty: "trivial",
  toDoDueDate: "2026-08-23",
  dueTime: "06:00",
  toDoPriority: "p1",
  toDoRecurrence: "FREQ=DAILY",
  toDoValueSlug: "health",
} as const satisfies ToDo
