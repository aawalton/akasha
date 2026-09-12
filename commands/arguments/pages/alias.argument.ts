import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const alias = {
  id: "01a094ea-a8cc-7bbc-8b51-ed58a8767599",
  type: "argument",
  slug: "alias",
  said: "--alias",
  takes: "the alias slot to take, where the next free one is not wanted",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
