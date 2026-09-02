import type { Module } from "@akasha/code-system/module"

export const poolBars = {
  id: "01a0628e-a5db-70f1-8dcb-7662895abef7",
  pageTypeSlug: "module",
  slug: "pool-bars",
  definition: "a hud's pools as bars, each with its current, its max, its fill and its delta",
  code: "ts",
  test: "ts",
} as const satisfies Module
