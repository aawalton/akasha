import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const seatPrompt = {
  id: "01a094e3-6f6e-77ef-85d6-24e27342dcad",
  type: "page-type/argument",
  slug: "seat-prompt",
  said: "--prompt",
  takes: "the text of the first turn the seat takes up",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:12:08.302Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
