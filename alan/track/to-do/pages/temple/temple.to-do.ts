import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const temple = {
  id: "01a14f1d-2d03-7bab-b650-d52d2ae6324d",
  type: "page-type/to-do",
  slug: "temple",
  title: "Temple",
  toDoCategory: "faith",
  toDoDueDate: "2026-10-19",
  priority: "p2",
  toDoRecurrence: "FREQ=WEEKLY;BYDAY=MO",
  toDoSortOrder: 2,
  toDoValue: "value/faith",
  createdAt: "2026-10-18T13:04:34.562Z",
  updatedAt: "2026-10-18T13:04:34.562Z",
} as const satisfies ToDo
