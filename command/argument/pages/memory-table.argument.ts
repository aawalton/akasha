import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryTable = {
  id: "01a1557b-6545-7cf6-a2e1-bf7eaaa6a425",
  type: "page-type/argument",
  slug: "memory-table",
  said: "--table-at",
  takes: "the address of a table of the game's Lua, written in hex, whose entries are listed",
  value: "text",
  placeholder: "hex",
  createdAt: "2026-10-19T18:45:12.644Z",
  updatedAt: "2026-10-19T18:45:12.644Z",
} as const satisfies Argument
