import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const checklist = {
  id: "01a09484-092d-7a5b-8474-9cc27b72b3c9",
  type: "page-type/argument",
  slug: "checklist",
  said: "--checklist",
  takes: "what the model is asked to look for",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T07:27:56.205Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
