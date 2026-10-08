import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const queryFile = {
  id: "01a094e4-07d3-7bc0-bb19-f78d5a663e33",
  type: "page-type/argument",
  slug: "query-file",
  said: "--query-file",
  takes: "the file the query is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:12:47.315Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
