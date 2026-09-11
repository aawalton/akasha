import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const antiquityLoreCatalog = {
  id: "01a0604d-239b-783a-8c52-bac74f8d09b0",
  pageTypeSlug: "module",
  type: "module",
  slug: "antiquity-lore-catalog",
  definition: "what the game states about one antiquity lore book and its antiquity set",
  code: "ts",
} as const satisfies Module
