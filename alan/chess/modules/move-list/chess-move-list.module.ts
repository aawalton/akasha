import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const chessMoveList = {
  id: "01a05bb1-0c04-7faa-a4fe-24bff095deb8",
  type: "module",
  slug: "chess-move-list",
  definition: "the moves of a game listed in order with one of them current",
  code: "tsx",
} as const satisfies Module
