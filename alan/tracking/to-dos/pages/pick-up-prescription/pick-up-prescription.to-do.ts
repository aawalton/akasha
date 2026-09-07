import type { ToDo } from "../../to-do.page-type.ts"

export const pickUpPrescription = {
  id: "019db533-f381-778c-b8c9-c15af992e8f2",
  pageTypeSlug: "to-do",
  slug: "pick-up-prescription",
  title: "Pick up prescription",
  toDoAnchoredFromCompletion: true,
  difficulty: "hard",
  toDoDueDate: "2026-09-06",
  toDoPriority: "p1",
  toDoRecurrence: "INTERVAL=30;FREQ=DAILY",
  toDoSortOrder: 33,
  toDoValueSlug: "health",
  toDoLastCompletedAt: "2026-07-30T10:31:03.068Z",
} as const satisfies ToDo
