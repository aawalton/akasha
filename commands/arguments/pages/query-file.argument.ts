import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const queryFile = {
  id: "01a094e4-07d3-7bc0-bb19-f78d5a663e33",
  type: "argument",
  slug: "query-file",
  said: "--query-file",
  takes: "the file the query is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
