import type { Module } from "@akasha/code-system/module"

export const recipeCatalogTier = {
  id: "01a0611b-1505-7c5c-8c22-443bd254e738",
  pageTypeSlug: "module",
  slug: "recipe-catalog-tier",
  definition: "the recipe data file, rendered from a game capture",
  code: "ts",
} as const satisfies Module
