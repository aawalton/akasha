import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toY = {
  id: "01a094c5-873e-7065-b178-0ada9d5166b7",
  type: "argument",
  slug: "to-y",
  said: "--to-y",
  takes: "how far down the viewport the finger ends",
  value: "whole-number",
  placeholder: "px",
} as const satisfies Argument
