import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const pickUpPrescription = {
  id: "019db533-f381-778c-b8c9-c15af992e8f2",
  type: "page-type/to-do",
  slug: "pick-up-prescription",
  title: "Pick up prescription",
  toDoAnchoredFromCompletion: true,
  difficulty: "hard",
  toDoDueDate: "2026-10-06",
  toDoPriority: "p1",
  toDoRecurrence: "INTERVAL=30;FREQ=DAILY",
  toDoSortOrder: 33,
  toDoValue: "value/health",
  toDoLastCompletedAt: "2026-09-07T01:38:57.564Z",
} as const satisfies ToDo
