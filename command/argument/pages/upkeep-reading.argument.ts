import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const upkeepReading = {
  id: "01a17ef5-e639-7d4a-8c9a-f27de0d70c5f",
  type: "page-type/argument",
  slug: "upkeep-reading",
  said: "--upkeep-reading",
  takes: "what the story's upkeep check is handed for a first session, written as JSON",
  value: "text",
  placeholder: "json",
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Argument
