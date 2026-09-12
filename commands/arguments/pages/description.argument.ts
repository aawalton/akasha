import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const description = {
  id: "01a094d7-dcc7-76d4-bc3c-083c52061e76",
  type: "argument",
  slug: "description",
  said: "--description",
  takes: "the event's description",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
