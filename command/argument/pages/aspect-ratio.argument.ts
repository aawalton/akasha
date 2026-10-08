import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const aspectRatio = {
  id: "01a094d5-487f-7a1d-b975-584389997505",
  type: "page-type/argument",
  slug: "aspect-ratio",
  said: "--aspect-ratio",
  takes: "the shape the output is fixed to",
  value: "text",
  placeholder: "ratio",
  createdAt: "2026-09-12T08:56:40.831Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
