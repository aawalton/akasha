import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const buyShortfall = {
  id: "01a0e30f-11f4-78e4-86e5-1e6d564d060c",
  type: "page-type/argument",
  slug: "buy-shortfall",
  said: "--buy-shortfall",
  takes: "whether a stocking rule buys at a merchant what the account holds short of its target",
  value: "true-or-false",
} as const satisfies Argument
