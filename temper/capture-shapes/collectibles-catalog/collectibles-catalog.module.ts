import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const collectiblesCatalog = {
  id: "01a0604d-239c-77a7-809f-62a84ec5fc79",
  pageTypeSlug: "module",
  slug: "collectibles-catalog",
  definition: "the collectibles the game lists, held under categories and subcategories",
  code: "ts",
} as const satisfies Module
