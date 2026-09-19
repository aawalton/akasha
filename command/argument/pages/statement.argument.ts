import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const statement = {
  id: "01a094d2-8560-7e99-9dba-cb7fa49e384b",
  type: "page-type/argument",
  slug: "statement",
  said: "--statement",
  takes: "the statement the record acted on states",
  value: "text",
  placeholder: "statement",
} as const satisfies Argument
