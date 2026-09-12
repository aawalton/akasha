import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const width = {
  id: "01a094d8-c4a8-7d58-8f2e-449cbf97da17",
  type: "argument",
  slug: "width",
  said: "--width",
  takes: "how wide the image is rendered",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
