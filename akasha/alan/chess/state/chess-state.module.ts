import type { Module } from "@akasha/code-system/module"

export const chessState = {
  id: "01a05bb1-0c05-725e-9854-dfa19034b0fe",
  pageTypeSlug: "module",
  slug: "chess-state",
  definition: "the position a chess game stands at and the moves reaching it",
  code: "ts",
} as const satisfies Module
