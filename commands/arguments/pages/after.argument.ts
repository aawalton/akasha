import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const after = {
  id: "01a094d5-43d9-71bf-b970-1bc7d16234e3",
  type: "argument",
  slug: "after",
  said: "--after",
  takes: "the rule the moved rule comes after",
  value: "text",
  placeholder: "anchor-id",
} as const satisfies Argument
