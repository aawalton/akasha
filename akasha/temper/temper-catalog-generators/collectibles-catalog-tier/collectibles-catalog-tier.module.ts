import type { Module } from "@akasha/code-system/module"

export const collectiblesCatalogTier = {
  id: "01a0611b-1504-7b52-9381-a5073dea5816",
  pageTypeSlug: "module",
  slug: "collectibles-catalog-tier",
  definition: "the collectibles data file, rendered from a game capture",
  code: "ts",
} as const satisfies Module
