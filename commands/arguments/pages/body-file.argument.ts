import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const bodyFile = {
  id: "01a094e3-5fae-7680-82b6-55f4d63533b2",
  type: "argument",
  slug: "body-file",
  said: "--body-file",
  takes: "the file the body is read from, or `-` for standard input",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
