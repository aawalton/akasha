import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const proseFile = {
  id: "01a0deca-7611-7e3c-9208-a80696c42d12",
  type: "page-type/argument",
  slug: "prose-file",
  said: "--prose-file",
  takes: "the file a turn's prose is read from",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
