import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const expectCount = {
  id: "01a094ce-542c-783c-b1f8-7cc98a0368a6",
  type: "argument",
  slug: "expect-count",
  said: "--expect-count",
  takes: "how many of those elements are to be there",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
