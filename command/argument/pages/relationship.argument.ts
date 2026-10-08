import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const relationship = {
  id: "01a094b0-d1b3-798e-953c-cd86b1e48d6f",
  type: "page-type/argument",
  slug: "relationship",
  said: "--relationship",
  takes: "who the stretch was with, by id or by title",
  value: "text",
  placeholder: "id|title",
  createdAt: "2026-09-12T08:16:51.123Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
