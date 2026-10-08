import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const reaction = {
  id: "01a094ef-4167-7524-963f-db43ef2f1b87",
  type: "page-type/argument",
  slug: "reaction",
  said: "--reaction",
  takes: "what Alan said about an artist",
  value: "text",
  placeholder: "md",
  createdAt: "2026-09-12T09:25:02.951Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
