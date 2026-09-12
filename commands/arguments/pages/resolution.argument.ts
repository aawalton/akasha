import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const resolution = {
  id: "01a094d0-9578-758f-97f8-c0fdfec2af3e",
  type: "argument",
  slug: "resolution",
  said: "--resolution",
  takes: "how many pixels the shortest edge is remade at",
  value: "whole-number",
  placeholder: "px",
} as const satisfies Argument
