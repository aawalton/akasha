import type { Module } from "@akasha/code-system/module"

export const chessGame = {
  id: "01a05be1-cb07-7e2a-9cda-3aa3d7c8d59e",
  pageTypeSlug: "module",
  slug: "chess-game",
  definition: "when a chess game is over and how it reads once written down",
  code: "ts",
} as const satisfies Module
