import type { ToDo } from "akasha/alan/track/to-dos/to-do.page-type.types.ts"

export const vyvanse = {
  id: "019ee9e5-849b-77fd-afca-ec414c6fbbfb",
  pageTypeSlug: "to-do",
  type: "to-do",
  slug: "vyvanse",
  title: "Vyvanse",
  difficulty: "trivial",
  toDoDueDate: "2026-09-12",
  dueTime: "06:00",
  toDoPriority: "p1",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "health",
  toDoLastCompletedAt: "2026-09-11T12:54:58.976Z",
} as const satisfies ToDo
