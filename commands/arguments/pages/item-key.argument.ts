import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const itemKey = {
  id: "01a094d3-8654-7323-bc0b-39470daf4ff6",
  type: "argument",
  slug: "item-key",
  said: "--item-key",
  takes: "ask instead whether each character knows one recipe, motif or script",
  value: "text",
  placeholder: "key",
} as const satisfies Argument
