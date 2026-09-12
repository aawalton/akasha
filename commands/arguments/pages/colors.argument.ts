import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const colors = {
  id: "01a094ee-82ec-7f31-a6e7-d2f7b11a6869",
  type: "argument",
  slug: "colors",
  said: "--colors",
  takes: "the color each initiative is drawn in, keyed by its slug",
  value: "none",
} as const satisfies Argument
