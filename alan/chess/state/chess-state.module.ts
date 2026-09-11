import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const chessState = {
  id: "01a05bb1-0c05-725e-9854-dfa19034b0fe",
  type: "module",
  slug: "chess-state",
  definition: "the position a chess game is at and the moves reaching it",
  code: "ts",
} as const satisfies Module
