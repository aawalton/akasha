import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const buyMaxPrice = {
  id: "01a0e348-1cc8-7442-9552-f92726bd23e8",
  type: "page-type/argument",
  slug: "buy-max-price",
  said: "--buy-max-price",
  takes:
    "the most gold a rule buying its shortfall pays for one of an item, where zero states none",
  value: "whole-number",
  placeholder: "gold",
} as const satisfies Argument
