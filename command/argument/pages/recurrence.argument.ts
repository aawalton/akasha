import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const recurrence = {
  id: "01a094d8-3406-7617-ab40-c751388da1bd",
  type: "page-type/argument",
  slug: "recurrence",
  said: "--recurrence",
  takes: "one RRULE body, said once over for each rule it carries",
  value: "text",
  placeholder: "rrule",
  createdAt: "2026-09-12T08:59:52.198Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
