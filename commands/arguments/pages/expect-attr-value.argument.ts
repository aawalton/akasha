import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectAttrValue = {
  id: "01a094ce-8f23-7e07-8229-c90e189c6db8",
  type: "argument",
  slug: "expect-attr-value",
  said: "--expect-attr-value",
  takes: "the value that attribute is to carry",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
