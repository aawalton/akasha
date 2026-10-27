import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const vacuumOffice = {
  id: "019db533-f381-7b94-9ac8-0903766e6917",
  type: "page-type/to-do",
  slug: "vacuum-office",
  title: "Vacuum office",
  toDoCategory: "health",
  difficulty: "light",
  toDoDueDate: "2026-10-27",
  priority: "p3",
  toDoRecurrence: "FREQ=MONTHLY;BYDAY=4MO",
  toDoSortOrder: 31,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-10-08T14:41:25.050Z",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-10-27T10:05:01.056Z",
} as const satisfies ToDo
