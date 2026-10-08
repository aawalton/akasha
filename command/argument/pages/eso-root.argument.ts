import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const esoRoot = {
  id: "01a094a4-3859-7270-ba32-fb61b1be955b",
  type: "page-type/argument",
  slug: "eso-root",
  said: "--eso-root",
  takes: "the game's Lua source root, the `~/esoui` clone where none is said",
  value: "path",
  placeholder: "path",
  createdAt: "2026-09-12T08:03:05.433Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
