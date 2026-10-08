import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const char = {
  id: "01a094b7-ce0d-768c-87c5-139d751a51b0",
  type: "page-type/argument",
  slug: "char",
  said: "--char",
  takes: "the character the answer is scoped to, as the capture names that character",
  value: "text",
  placeholder: "id",
  createdAt: "2026-09-12T08:24:28.941Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
