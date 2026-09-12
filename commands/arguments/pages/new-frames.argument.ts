import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const newFrames = {
  id: "01a094d3-31f6-785c-8671-012f796cfb7d",
  type: "argument",
  slug: "new-frames",
  said: "--new-frames",
  takes: "how many frames this asks to generate",
  value: "whole-number",
  placeholder: "n",
  default: "16",
} as const satisfies Argument
