import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const vyvanse = {
  id: "019ee9e5-849b-77fd-afca-ec414c6fbbfb",
  type: "page-type/to-do",
  slug: "vyvanse",
  title: "Vyvanse",
  difficulty: "trivial",
  toDoDueDate: "2026-09-17",
  dueTime: "06:00",
  toDoPriority: "p1",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-16T13:07:22.393Z",
} as const satisfies ToDo
