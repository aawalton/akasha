import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryWord = {
  id: "01a15577-71b0-71bc-a31a-9e874a7e5a8a",
  type: "page-type/argument",
  slug: "memory-word",
  said: "--find-word",
  takes: "the eight bytes, written in hex, whose aligned copies in the game's memory are listed",
  value: "text",
  placeholder: "hex",
  createdAt: "2026-10-19T18:40:53.679Z",
  updatedAt: "2026-10-19T18:40:53.679Z",
} as const satisfies Argument
