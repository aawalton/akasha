import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryText = {
  id: "01a15577-71b0-7505-8e83-c9aa9aa00b9b",
  type: "page-type/argument",
  slug: "memory-text",
  said: "--find-text",
  takes: "the text whose copies in the game's memory are listed",
  value: "text",
  placeholder: "text",
  createdAt: "2026-10-19T18:40:53.679Z",
  updatedAt: "2026-10-19T18:40:53.679Z",
} as const satisfies Argument
