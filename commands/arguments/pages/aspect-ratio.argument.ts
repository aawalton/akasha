import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const aspectRatio = {
  id: "01a094d5-487f-7a1d-b975-584389997505",
  type: "argument",
  slug: "aspect-ratio",
  said: "--aspect-ratio",
  takes: "the shape the output is fixed to",
  value: "text",
  placeholder: "ratio",
} as const satisfies Argument
