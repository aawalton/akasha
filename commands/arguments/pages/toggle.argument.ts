import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toggle = {
  id: "01a094d2-57a9-7f52-a06e-4355f1af02ea",
  type: "argument",
  slug: "toggle",
  said: "--toggle",
  takes: "the automation toggle set",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
