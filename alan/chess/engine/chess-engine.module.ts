import type { Module } from "@akasha/code-system/module"

export const chessEngine = {
  id: "01a05be1-cb06-7c4e-a1a7-91928425c7d3",
  pageTypeSlug: "module",
  slug: "chess-engine",
  definition: "a chess engine started as a process and read until it answers",
  code: "ts",
} as const satisfies Module
