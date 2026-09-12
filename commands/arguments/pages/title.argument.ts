import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const title = {
  id: "01a094b0-c2a4-71d7-ae22-2df174cac987",
  type: "argument",
  slug: "title",
  said: "--title",
  takes: "a title a person reads",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
