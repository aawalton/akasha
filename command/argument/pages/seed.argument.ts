import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seed = {
  id: "01a094b5-8477-7a82-a2c5-f4a757ff07cb",
  type: "page-type/argument",
  slug: "seed",
  said: "--seed",
  takes: "the sampler seed",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:21:59.031Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
