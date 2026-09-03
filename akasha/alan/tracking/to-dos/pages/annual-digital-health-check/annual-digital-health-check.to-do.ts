import type { ToDo } from "../../to-do.page-type.ts"

export const annualDigitalHealthCheck = {
  id: "019db533-f381-7b2b-9863-c068b02edc96",
  pageTypeSlug: "to-do",
  slug: "annual-digital-health-check",
  title: "Annual Digital Health Check",
  toDoCategory: "health",
  toDoDueDate: "2026-11-01",
  toDoPriority: "p3",
  toDoRecurrence: "FREQ=YEARLY;BYMONTH=11;BYMONTHDAY=1",
  toDoSortOrder: 54,
  toDoValueSlug: "health",
  whatItTakes: "txt",
} as const satisfies ToDo
