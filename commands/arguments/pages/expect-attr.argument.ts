import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectAttr = {
  id: "01a094ce-7c00-75cc-8efe-cbfc08ae5154",
  type: "argument",
  slug: "expect-attr",
  said: "--expect-attr",
  takes: "the attribute read off that element",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
