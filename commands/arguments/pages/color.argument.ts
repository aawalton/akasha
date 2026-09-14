import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const color = {
  id: "01a0a03c-3a43-70c6-bfab-f57c26d395bb",
  type: "argument",
  slug: "color",
  said: "--color",
  takes: "the side of the board taken, `white` or `black`",
  value: "text",
  placeholder: "side",
  default: "white",
} as const satisfies Argument
