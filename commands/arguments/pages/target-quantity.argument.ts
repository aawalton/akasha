import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const targetQuantity = {
  id: "01a09513-aedd-7dd1-9099-aa991d127dec",
  type: "argument",
  slug: "target-quantity",
  said: "--target",
  takes: "the total quantity to buy up to",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
