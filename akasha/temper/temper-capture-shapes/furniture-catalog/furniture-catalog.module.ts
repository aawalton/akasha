import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const furnitureCatalog = {
  id: "01a0604d-239d-7b10-b5af-05c24877acb5",
  pageTypeSlug: "module",
  slug: "furniture-catalog",
  definition: "the categories and subcategories the game files house furnishings under",
  code: "ts",
} as const satisfies Module
