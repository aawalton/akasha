import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectTitle = {
  id: "01a094ce-2e6f-742d-a469-87d5474328a8",
  type: "argument",
  slug: "expect-title",
  said: "--expect-title",
  takes: "the title the document is to carry",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
