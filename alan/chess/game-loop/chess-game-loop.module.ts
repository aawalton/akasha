import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chessGameLoop = {
  id: "01a05be1-cb07-7b27-ba8a-b2e4a56e7bef",
  type: "module",
  slug: "chess-game-loop",
  definition: "a whole chess game played out one move at a time",
  code: "ts",
} as const satisfies Module
