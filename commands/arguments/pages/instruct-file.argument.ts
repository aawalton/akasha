import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const instructFile = {
  id: "01a094dc-d46d-7537-8954-444a8dec2364",
  type: "argument",
  slug: "instruct-file",
  said: "--instruct-file",
  takes: "the file the voice description is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
