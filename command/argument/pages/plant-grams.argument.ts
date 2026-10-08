import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const plantGrams = {
  id: "01a094e1-7cfd-7b8c-9ece-7f6820a07730",
  type: "page-type/argument",
  slug: "plant-grams",
  said: "--plant-grams",
  takes: "grams of whole plants in the food",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T09:10:00.701Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
