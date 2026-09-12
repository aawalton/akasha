import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const esoRoot = {
  id: "01a094a4-3859-7270-ba32-fb61b1be955b",
  type: "argument",
  slug: "eso-root",
  said: "--eso-root",
  takes: "the game's Lua source root, the `~/esoui` clone where none is said",
  value: "path",
  placeholder: "path",
} as const satisfies Argument
