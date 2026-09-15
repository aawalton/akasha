import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const percent = {
  id: "01a0a023-bd4e-7b2b-bfe6-c87c5f350aeb",
  type: "page-type/argument",
  slug: "percent",
  said: "--percent",
  takes: "a number of nought to a hundred",
  value: "whole-number",
  placeholder: "percent",
} as const satisfies Argument
