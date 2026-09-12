import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const prompt = {
  id: "01a094e3-6f6e-77ef-85d6-24e27342dcad",
  type: "argument",
  slug: "prompt",
  said: "--prompt",
  takes: "the text of the first turn the seat takes up",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
