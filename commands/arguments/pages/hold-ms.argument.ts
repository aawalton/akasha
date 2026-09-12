import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const holdMs = {
  id: "01a094c5-9bc6-768d-b3b3-344853eee016",
  type: "argument",
  slug: "hold-ms",
  said: "--hold-ms",
  takes: "how long the finger holds before it drags, 800 where none is said",
  value: "whole-number",
  placeholder: "ms",
} as const satisfies Argument
