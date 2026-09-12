import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const fromFile = {
  id: "01a094e5-211d-7a7d-9282-aa4fff006a29",
  type: "argument",
  slug: "from-file",
  said: "--from-file",
  takes: "the day's lines, read from a file or from standard input",
  value: "text",
  placeholder: "path|-",
} as const satisfies Argument
