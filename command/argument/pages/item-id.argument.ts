import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const itemId = {
  id: "01a094ba-be30-78dc-8127-403debcfd95e",
  type: "page-type/argument",
  slug: "item-id",
  said: "--item-id",
  takes: "the game item id the rule matches on",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:27:41.488Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
