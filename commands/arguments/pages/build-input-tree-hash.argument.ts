import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const buildInputTreeHash = {
  id: "01a094c8-a173-739a-bd07-d6b775d51a5c",
  type: "argument",
  slug: "build-input-tree-hash",
  said: "--build-input-tree-hash",
  takes: "the build-input closure the cut worked out",
  value: "text",
  placeholder: "hash",
} as const satisfies Argument
