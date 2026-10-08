import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const instructFile = {
  id: "01a094dc-d46d-7537-8954-444a8dec2364",
  type: "page-type/argument",
  slug: "instruct-file",
  said: "--instruct-file",
  takes: "the file the voice description is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T09:04:55.405Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
