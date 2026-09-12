import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const itemId = {
  id: "01a094ba-be30-78dc-8127-403debcfd95e",
  type: "argument",
  slug: "item-id",
  said: "--item-id",
  takes: "the game item id the rule matches on",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
