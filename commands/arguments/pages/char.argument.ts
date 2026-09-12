import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const char = {
  id: "01a094b7-ce0d-768c-87c5-139d751a51b0",
  type: "argument",
  slug: "char",
  said: "--char",
  takes: "the character the answer is scoped to, as the capture names that character",
  value: "text",
  placeholder: "id",
} as const satisfies Argument
