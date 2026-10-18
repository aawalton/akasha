import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const scriptureStudy = {
  id: "01a14f1d-0416-73a3-8100-69b4b58659ef",
  type: "page-type/to-do",
  slug: "scripture-study",
  title: "Scripture Study",
  toDoCategory: "faith",
  toDoDueDate: "2026-10-19",
  priority: "p2",
  toDoRecurrence: "FREQ=DAILY",
  toDoSortOrder: 1,
  toDoValue: "value/faith",
  toDoLastCompletedAt: "2026-10-18T14:03:45.811Z",
  createdAt: "2026-10-18T13:04:24.086Z",
  updatedAt: "2026-10-18T14:03:46.250Z",
} as const satisfies ToDo
