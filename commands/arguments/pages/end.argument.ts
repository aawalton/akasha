import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const end = {
  id: "01a094d7-c99b-7f27-87c9-d0e4e8057ccc",
  type: "argument",
  slug: "end",
  said: "--end",
  takes: "when the event closes, as a timestamp or as a date alone",
  value: "text",
  placeholder: "iso",
} as const satisfies Argument
