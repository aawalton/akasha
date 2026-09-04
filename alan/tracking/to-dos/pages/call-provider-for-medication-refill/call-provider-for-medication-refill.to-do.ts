import type { ToDo } from "../../to-do.page-type.ts"

export const callProviderForMedicationRefill = {
  id: "019db533-f381-7c9c-86de-0e965e395905",
  pageTypeSlug: "to-do",
  slug: "call-provider-for-medication-refill",
  title: "Call provider for medication refill",
  toDoCategory: "inbox",
  difficulty: "hard",
  toDoDueDate: "2026-09-01",
  toDoPriority: "p1",
  toDoRecurrence: "FREQ=DAILY;INTERVAL=90",
  toDoSortOrder: 0,
  toDoValueSlug: "health",
} as const satisfies ToDo
