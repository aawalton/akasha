import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const y = {
  id: "01a094be-0267-779c-9015-eee7c1ad3a48",
  type: "argument",
  slug: "y",
  said: "--y",
  takes: "how far down the viewport the point is",
  value: "whole-number",
  placeholder: "px",
} as const satisfies Argument
