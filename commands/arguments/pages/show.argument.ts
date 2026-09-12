import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const show = {
  id: "01a094fa-2e8e-7c9f-99d8-de204dfa80d9",
  type: "argument",
  slug: "show",
  said: "--show",
  takes: "the whole prompt put for each case shown and the whole answer back",
  value: "none",
} as const satisfies Argument
