import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const tracedItemId = {
  id: "01a094c9-a756-79fc-ae7e-4ffca8b41ce5",
  type: "argument",
  slug: "traced-item-id",
  said: "--traced-item-id",
  takes: "the item whose stored trace is compared",
  value: "text",
  placeholder: "item-id",
} as const satisfies Argument
