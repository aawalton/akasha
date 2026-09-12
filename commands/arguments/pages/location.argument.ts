import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const location = {
  id: "01a094d7-f072-7376-bf2f-027151fd8a90",
  type: "argument",
  slug: "location",
  said: "--location",
  takes: "the event's location",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
