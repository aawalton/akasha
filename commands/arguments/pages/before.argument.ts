import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const before = {
  id: "01a094d4-deb4-77ca-b6b3-2c860dad7335",
  type: "argument",
  slug: "before",
  said: "--before",
  takes: "the rule the moved rule comes before",
  value: "text",
  placeholder: "anchor-id",
} as const satisfies Argument
