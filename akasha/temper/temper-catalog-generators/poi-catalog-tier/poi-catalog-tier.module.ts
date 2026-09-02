import type { Module } from "@akasha/code-system/module"

export const poiCatalogTier = {
  id: "01a0611b-1505-7dd8-b88c-09b58d9b54dd",
  pageTypeSlug: "module",
  slug: "poi-catalog-tier",
  definition: "the points of interest data file, rendered from a game capture",
  code: "ts",
} as const satisfies Module
