import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const item = {
  id: "01a094c6-e184-7846-a75c-e39a7efec743",
  type: "argument",
  slug: "item",
  said: "--item",
  takes: "the item acted on, as a bare item id or as a game item link",
  value: "text",
  placeholder: "item",
} as const satisfies Argument
