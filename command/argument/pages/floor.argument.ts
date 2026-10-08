import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const floor = {
  id: "01a094d2-3b5b-7134-84ce-000850a60cee",
  type: "page-type/argument",
  slug: "floor",
  said: "--floor",
  takes: "the cosine at or above which a frame is the same identity",
  value: "text",
  placeholder: "f",
  default: "0.45",
  createdAt: "2026-09-12T08:53:20.859Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
