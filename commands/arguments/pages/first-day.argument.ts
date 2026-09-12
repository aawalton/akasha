import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const firstDay = {
  id: "01a094ef-4c48-7091-a5b4-46ff34ef1cee",
  type: "argument",
  slug: "first-day",
  said: "--since",
  takes: "the first civil day to bring in",
  value: "text",
  placeholder: "YYYY-MM-DD",
} as const satisfies Argument
