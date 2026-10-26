import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const vyvanse = {
  id: "019ee9e5-849b-77fd-afca-ec414c6fbbfb",
  type: "page-type/to-do",
  slug: "vyvanse",
  title: "Vyvanse",
  difficulty: "trivial",
  toDoDueDate: "2026-10-27",
  dueTime: "06:00",
  priority: "p1",
  toDoRecurrence: "FREQ=DAILY",
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-26T13:50:36.179Z",
  createdAt: "2026-06-21T11:16:33.563Z",
  updatedAt: "2026-10-26T13:50:36.611Z",
} as const satisfies ToDo
