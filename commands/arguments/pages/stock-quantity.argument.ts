import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const stockQuantity = {
  id: "01a094bd-dc11-762c-ae74-a7780cab7372",
  type: "argument",
  slug: "stock-quantity",
  said: "--stock-quantity",
  takes: "how many the destination is stocked up to",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
