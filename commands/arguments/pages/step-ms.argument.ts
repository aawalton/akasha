import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const stepMs = {
  id: "01a094c5-c3ee-7ac3-8f46-5d0784dc6218",
  type: "argument",
  slug: "step-ms",
  said: "--step-ms",
  takes: "how long each move of the drag takes, 30 where none is said",
  value: "whole-number",
  placeholder: "ms",
  default: "30",
} as const satisfies Argument
