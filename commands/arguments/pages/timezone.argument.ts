import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const timezone = {
  id: "01a094d8-1f13-78e8-8b84-e36d2d8312b0",
  type: "argument",
  slug: "timezone",
  said: "--timezone",
  takes: "the IANA zone a start and an end carrying none are read in",
  value: "text",
  placeholder: "iana",
} as const satisfies Argument
