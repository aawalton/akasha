import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const memoryGlobal = {
  id: "01a15586-9c1c-74f1-8142-6ad2c5ffdc4a",
  type: "page-type/argument",
  slug: "memory-global",
  said: "--global",
  takes: "the name of a global table of the game's Lua, whose entries are listed",
  value: "text",
  placeholder: "name",
  createdAt: "2026-10-19T18:57:27.580Z",
  updatedAt: "2026-10-19T18:57:27.580Z",
} as const satisfies Argument
