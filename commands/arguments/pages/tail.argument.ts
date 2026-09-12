import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const tail = {
  id: "01a094b7-52bf-7d29-b278-b640e5d2f5be",
  type: "argument",
  slug: "tail",
  said: "--tail",
  takes: "how many trailing lines to answer with, a hundred where none is said",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
