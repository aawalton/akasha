import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const category = {
  id: "01a094bc-be92-7c1f-8454-61c09d7caa68",
  type: "argument",
  slug: "category",
  said: "--category",
  takes: "the category of items the rule reaches",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
