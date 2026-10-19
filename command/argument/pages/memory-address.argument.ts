import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryAddress = {
  id: "01a15577-71b0-783a-b167-7c91c9ca1c85",
  type: "page-type/argument",
  slug: "memory-address",
  said: "--dump-at",
  takes: "the address in the game's memory, written in hex, whose bytes are shown",
  value: "text",
  placeholder: "hex",
  createdAt: "2026-10-19T18:40:53.679Z",
  updatedAt: "2026-10-19T18:40:53.679Z",
} as const satisfies Argument
