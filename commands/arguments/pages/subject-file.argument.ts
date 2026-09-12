import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const subjectFile = {
  id: "01a094e3-4c26-7dc8-a762-277ee4dcc981",
  type: "argument",
  slug: "subject-file",
  said: "--subject-file",
  takes: "the file the subject is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
