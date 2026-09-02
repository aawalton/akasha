import type { Module } from "@akasha/code-system/module"

export const questCatalogTier = {
  id: "01a0611f-49e1-71cd-bfbe-d176bd3d076d",
  pageTypeSlug: "module",
  slug: "quest-catalog-tier",
  definition: "the quest data file, rendered from a mined game capture",
  code: "ts",
} as const satisfies Module
