import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const summary = {
  id: "01a094d7-9f86-7db8-8562-a2847b750e91",
  type: "argument",
  slug: "summary",
  said: "--summary",
  takes: "the event's title",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
