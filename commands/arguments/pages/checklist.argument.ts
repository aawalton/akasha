import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const checklist = {
  id: "01a09484-092d-7a5b-8474-9cc27b72b3c9",
  type: "argument",
  slug: "checklist",
  said: "--checklist",
  takes: "what the model is asked to look for",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
