import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const newFrames = {
  id: "01a094d3-31f6-785c-8671-012f796cfb7d",
  type: "page-type/argument",
  slug: "new-frames",
  said: "--new-frames",
  takes: "how many frames this asks to generate",
  value: "whole-number",
  placeholder: "n",
  default: "16",
  createdAt: "2026-09-12T08:54:23.990Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
