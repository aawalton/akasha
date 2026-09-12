import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const refTextFile = {
  id: "01a094dc-696e-727f-8957-95e69fcf72da",
  type: "argument",
  slug: "ref-text-file",
  said: "--ref-text-file",
  takes: "the file the reference clip's transcript is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
