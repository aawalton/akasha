import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const x = {
  id: "01a094bd-7d15-72ac-a607-15ddb8acc170",
  type: "argument",
  slug: "x",
  said: "--x",
  takes: "how far across the viewport the point is",
  value: "whole-number",
  placeholder: "px",
} as const satisfies Argument
