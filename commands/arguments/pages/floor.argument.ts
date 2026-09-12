import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const floor = {
  id: "01a094d2-3b5b-7134-84ce-000850a60cee",
  type: "argument",
  slug: "floor",
  said: "--floor",
  takes: "the cosine at or above which a frame is the same identity",
  value: "text",
  placeholder: "f",
  default: "0.45",
} as const satisfies Argument
