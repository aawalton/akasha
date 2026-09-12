import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const date = {
  id: "01a094e1-a438-76ce-9640-19750d323a1b",
  type: "argument",
  slug: "date",
  said: "--date",
  takes: "the Mountain calendar date the act is filed under",
  value: "text",
  placeholder: "YYYY-MM-DD",
} as const satisfies Argument
