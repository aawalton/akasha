import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const band = {
  id: "01a0a03c-1bef-7e09-8ae3-6cfacd67a153",
  type: "argument",
  slug: "band",
  said: "--band",
  takes: "the rating band the model plays at",
  value: "whole-number",
  placeholder: "elo",
  default: "1500",
} as const satisfies Argument
