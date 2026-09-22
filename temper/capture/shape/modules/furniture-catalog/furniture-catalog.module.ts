import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const furnitureCatalog = {
  id: "01a0604d-239d-7b10-b5af-05c24877acb5",
  type: "page-type/module",
  slug: "furniture-catalog",
  definition: "the categories and subcategories of furnishings in the game files",
  code: "ts",
} as const satisfies Module
