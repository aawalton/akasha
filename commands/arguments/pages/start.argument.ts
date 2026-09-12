import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const start = {
  id: "01a094d7-b51e-7b69-8f12-12780bb549db",
  type: "argument",
  slug: "start",
  said: "--start",
  takes: "when the event opens, as a timestamp or as a date alone",
  value: "text",
  placeholder: "iso",
} as const satisfies Argument
