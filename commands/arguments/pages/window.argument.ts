import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const window = {
  id: "01a094ca-0e3f-78d7-aa87-5585e3f433f0",
  type: "argument",
  slug: "window",
  said: "--window",
  takes: "the window the top lists are counted over, medium where none is said",
  value: "text",
  placeholder: "window",
} as const satisfies Argument
