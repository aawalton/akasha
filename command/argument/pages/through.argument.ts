import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const through = {
  id: "01a0d4e4-4ae9-7e19-9bd8-b59f33a26a55",
  type: "page-type/argument",
  slug: "through",
  said: "--through",
  takes: "the number of the last turn a chapter takes",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
