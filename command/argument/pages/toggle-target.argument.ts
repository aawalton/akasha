import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const toggleTarget = {
  id: "01a09513-aedf-7b06-86e0-68e1b5191e05",
  type: "page-type/argument",
  slug: "toggle-target",
  said: "--target",
  takes: "which interface a toggle carried by both is set on",
  value: "text",
  placeholder: "characters|companions",
  createdAt: "2026-09-12T10:04:50.271Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
