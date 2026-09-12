import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const surfaceFile = {
  id: "01a094e6-aa2e-7017-a0b7-f2f86e68cfe7",
  type: "argument",
  slug: "surface-file",
  said: "--surface-file",
  takes: "the file the delivered surface is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
