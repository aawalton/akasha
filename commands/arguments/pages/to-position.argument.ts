import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toPosition = {
  id: "01a09513-aee8-75a1-8762-46065da7b633",
  type: "argument",
  slug: "to-position",
  said: "--to",
  takes: "the position the rule moves to, counted over the rules a person wrote",
  value: "whole-number",
  placeholder: "index",
} as const satisfies Argument
