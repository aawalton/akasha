import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const windowFrom = {
  id: "01a094eb-b6ce-76c3-b0b6-358320f7c664",
  type: "argument",
  slug: "window-from",
  said: "--from",
  takes: "where the window opens",
  value: "text",
  placeholder: "iso",
} as const satisfies Argument
