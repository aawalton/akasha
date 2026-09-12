import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const visit = {
  id: "01a09607-fd36-7abb-985c-b6863819a821",
  type: "argument",
  slug: "visit",
  said: "--visit",
  takes: "which visit to read, counted back from the most recent",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
