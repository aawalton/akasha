import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const recurrence = {
  id: "01a094d8-3406-7617-ab40-c751388da1bd",
  type: "argument",
  slug: "recurrence",
  said: "--recurrence",
  takes: "one RRULE body, said once over for each rule it carries",
  value: "text",
  placeholder: "rrule",
} as const satisfies Argument
