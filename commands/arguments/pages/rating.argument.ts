import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const rating = {
  id: "01a094db-fb21-793e-8145-27473c5a789e",
  type: "argument",
  slug: "rating",
  said: "--rating",
  takes: "the grade, a rung on the ladder from `F` up to `S+`",
  value: "text",
  placeholder: "F..S+",
} as const satisfies Argument
