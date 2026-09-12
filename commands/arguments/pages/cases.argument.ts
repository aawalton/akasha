import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const cases = {
  id: "01a094f9-636e-78a1-bd7d-2529e54b309b",
  type: "argument",
  slug: "cases",
  said: "--cases",
  takes: "the model test whose cases are used, its own by default",
  value: "text",
  placeholder: "test",
} as const satisfies Argument
