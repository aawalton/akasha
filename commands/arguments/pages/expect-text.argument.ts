import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectText = {
  id: "01a094ce-1b31-7d4c-a70a-abf794452c46",
  type: "argument",
  slug: "expect-text",
  said: "--expect-text",
  takes: "text the rendered body is to hold",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
