import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const statement = {
  id: "01a094d2-8560-7e99-9dba-cb7fa49e384b",
  type: "page-type/argument",
  slug: "statement",
  said: "--statement",
  takes: "the statement the record acted on states",
  value: "text",
  placeholder: "statement",
  createdAt: "2026-09-12T08:53:39.808Z",
  updatedAt: "2026-09-19T03:44:27.000Z",
} as const satisfies Argument
