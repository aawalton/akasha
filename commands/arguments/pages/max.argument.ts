import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const max = {
  id: "01a094df-50b9-75ef-b1d0-42ac9b83c346",
  type: "argument",
  slug: "max",
  said: "--max",
  takes: "how many rows to answer with at most",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
