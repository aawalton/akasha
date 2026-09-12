import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const messageQuery = {
  id: "01a094e4-ed10-7e2d-a4ea-25d7563eaa55",
  type: "argument",
  slug: "message-query",
  said: "--query",
  takes: "the run of characters a message's text must hold",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
