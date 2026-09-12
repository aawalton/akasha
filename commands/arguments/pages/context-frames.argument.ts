import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const contextFrames = {
  id: "01a094d3-1e6e-782a-8ae6-64649068a476",
  type: "argument",
  slug: "context-frames",
  said: "--context-frames",
  takes: "how many of the clip's own frames the window holds",
  value: "whole-number",
  placeholder: "n",
  default: "24",
} as const satisfies Argument
