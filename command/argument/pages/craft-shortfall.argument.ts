import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const craftShortfall = {
  id: "01a0d4a5-749b-76f1-aa49-a20bf49786e9",
  type: "page-type/argument",
  slug: "craft-shortfall",
  said: "--craft-shortfall",
  takes: "whether a stocking rule crafts what the account holds short of its target",
  value: "true-or-false",
} as const satisfies Argument
