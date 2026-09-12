import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const uri = {
  id: "01a094c1-0a79-73c5-896c-20b74bcce59f",
  type: "argument",
  slug: "uri",
  said: "--uri",
  takes: "the exact track played, which searches for nothing",
  value: "text",
  placeholder: "uri",
} as const satisfies Argument
