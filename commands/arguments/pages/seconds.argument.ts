import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const seconds = {
  id: "01a094fe-e741-7b86-9e13-769de787681c",
  type: "argument",
  slug: "seconds",
  said: "--seconds",
  takes: "how long to wait for the port line before giving up",
  value: "whole-number",
  placeholder: "seconds",
} as const satisfies Argument
