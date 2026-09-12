import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const action = {
  id: "01a094b6-1d2f-79f9-9974-9cc7d80fc2df",
  type: "argument",
  slug: "action",
  said: "--action",
  takes: "what is done with an item the rule reaches",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
