import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const first = {
  id: "01a0d9aa-7c59-7ee8-a1eb-aebe6454bd4b",
  type: "page-type/argument",
  slug: "first",
  said: "--first",
  takes: "how many are listed, counted from the first",
  value: "whole-number",
  placeholder: "n",
  default: "8",
} as const satisfies Argument
