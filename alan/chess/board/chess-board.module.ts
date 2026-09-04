import type { Module } from "@akasha/code-system/module"

export const chessBoard = {
  id: "01a05bb1-0c04-7928-a1eb-636fd857d174",
  pageTypeSlug: "module",
  slug: "chess-board",
  definition: "a chess position drawn in a browser and played by dragging pieces",
  code: "tsx",
} as const satisfies Module
