import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const statement = {
  id: "01a094d2-8560-7e99-9dba-cb7fa49e384b",
  type: "argument",
  slug: "statement",
  said: "--statement",
  takes: "the statement the intent acted on states",
  value: "text",
  placeholder: "statement",
} as const satisfies Argument
