import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const all = {
  id: "01a094d0-0938-7b98-b99d-f76ddddf45fa",
  type: "argument",
  slug: "all",
  said: "--all",
  takes: "collect every catalog domain again",
  value: "none",
} as const satisfies Argument
