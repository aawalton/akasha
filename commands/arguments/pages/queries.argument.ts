import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const queries = {
  id: "01a094c1-fbe0-7bd5-b4d0-87494f2cff59",
  type: "argument",
  slug: "queries",
  said: "<query>...",
  takes: "the track queries, played in the order they are said",
  value: "text",
  placeholder: "query",
  repeats: true,
} as const satisfies Argument
