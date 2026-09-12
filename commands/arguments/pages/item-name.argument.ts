import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const itemName = {
  id: "01a094bb-43ae-75ec-81d8-fd1c9af7dd2e",
  type: "argument",
  slug: "item-name",
  said: "--item-name",
  takes: "the item's display name, where the id remains what it matches on",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
