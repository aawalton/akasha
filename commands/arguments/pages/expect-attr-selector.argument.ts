import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectAttrSelector = {
  id: "01a094ce-67ff-7279-a6dc-2f38ef7cd0cb",
  type: "argument",
  slug: "expect-attr-selector",
  said: "--expect-attr-selector",
  takes: "the element an attribute is read off",
  value: "text",
  placeholder: "sel",
} as const satisfies Argument
