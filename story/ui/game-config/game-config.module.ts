import type { Module } from "@akasha/code-system/module"

export const gameConfig = {
  id: "01a0628e-a5db-7379-8f40-766df0931925",
  pageTypeSlug: "module",
  slug: "game-config",
  definition: "the reader base url a game's turn links hang off, taken from the environment",
  code: "ts",
} as const satisfies Module
