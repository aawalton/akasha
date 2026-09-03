import type { Module } from "@akasha/code-system/module"

export const idleGameStore = {
  id: "01a0655d-dabf-7cd8-992c-3f0511e5ea1e",
  pageTypeSlug: "module",
  slug: "idle-game-store",
  definition: "the idle game's state held once for every component that reads it",
  code: "ts",
} as const satisfies Module
