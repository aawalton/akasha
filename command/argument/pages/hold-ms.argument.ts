import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const holdMs = {
  id: "01a094c5-9bc6-768d-b3b3-344853eee016",
  type: "page-type/argument",
  slug: "hold-ms",
  said: "--hold-ms",
  takes: "how long the finger holds before it drags, 800 where none is said",
  value: "whole-number",
  placeholder: "ms",
  default: "800",
  createdAt: "2026-09-12T08:39:33.574Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
