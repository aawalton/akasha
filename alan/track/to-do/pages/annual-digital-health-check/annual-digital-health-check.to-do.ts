import type { ToDo } from "akasha/alan/track/to-do/to-do.page-type.types.ts"

export const annualDigitalHealthCheck = {
  id: "019db533-f381-7b2b-9863-c068b02edc96",
  type: "page-type/to-do",
  slug: "annual-digital-health-check",
  title: "Annual Digital Health Check",
  toDoCategory: "health",
  toDoDueDate: "2026-11-01",
  priority: "p3",
  toDoRecurrence: "FREQ=YEARLY;BYMONTH=11;BYMONTHDAY=1",
  toDoSortOrder: 54,
  toDoValue: "value/health",
  whatItTakes: "txt",
  createdAt: "2026-04-22T12:39:34.017Z",
  updatedAt: "2026-09-21T18:27:30.000Z",
} as const satisfies ToDo
