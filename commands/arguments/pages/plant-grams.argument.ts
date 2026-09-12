import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const plantGrams = {
  id: "01a094e1-7cfd-7b8c-9ece-7f6820a07730",
  type: "argument",
  slug: "plant-grams",
  said: "--plant-grams",
  takes: "grams of whole plants in the food",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
