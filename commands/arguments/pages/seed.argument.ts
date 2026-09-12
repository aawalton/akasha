import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const seed = {
  id: "01a094b5-8477-7a82-a2c5-f4a757ff07cb",
  type: "argument",
  slug: "seed",
  said: "--seed",
  takes: "the sampler seed",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
