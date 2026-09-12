import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const relationship = {
  id: "01a094b0-d1b3-798e-953c-cd86b1e48d6f",
  type: "argument",
  slug: "relationship",
  said: "--relationship",
  takes: "who the stretch was with, by id or by title",
  value: "text",
  placeholder: "id|title",
} as const satisfies Argument
