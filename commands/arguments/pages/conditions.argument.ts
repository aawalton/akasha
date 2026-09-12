import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const conditions = {
  id: "01a094bd-4eee-7bbb-9bbe-14b4245a9c56",
  type: "argument",
  slug: "conditions",
  said: "--conditions",
  takes: "the conditions narrowing which items the rule reaches",
  value: "text",
  placeholder: "json",
} as const satisfies Argument
