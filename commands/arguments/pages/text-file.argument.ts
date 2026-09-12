import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const textFile = {
  id: "01a094db-c07f-7337-86cb-f9ccfc7b5830",
  type: "argument",
  slug: "text-file",
  said: "--text-file",
  takes: "the file the text is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
