import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const link = {
  id: "01a094c9-41d0-728f-8800-e3b601bfc09e",
  type: "argument",
  slug: "link",
  said: "--link",
  takes: "the game item link read",
  value: "text",
  placeholder: "link",
} as const satisfies Argument
