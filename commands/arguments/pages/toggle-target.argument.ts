import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toggleTarget = {
  id: "01a09513-aedf-7b06-86e0-68e1b5191e05",
  type: "argument",
  slug: "toggle-target",
  said: "--target",
  takes: "which interface a toggle carried by both is set on",
  value: "text",
  placeholder: "characters|companions",
} as const satisfies Argument
