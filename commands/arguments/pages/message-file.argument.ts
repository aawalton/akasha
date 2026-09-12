import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const messageFile = {
  id: "01a094e4-c803-7da2-8da8-4b63ff944755",
  type: "argument",
  slug: "message-file",
  said: "--message-file",
  takes: "the file the commit message is read from",
  value: "path",
  placeholder: "file",
} as const satisfies Argument
