import type { Module } from "@akasha/code/module"

export const chessUci = {
  id: "01a05be1-cb07-77cb-8a15-0713644ddc19",
  pageTypeSlug: "module",
  type: "module",
  slug: "chess-uci",
  definition: "the lines a chess engine speaks, read into values",
  code: "ts",
} as const satisfies Module
