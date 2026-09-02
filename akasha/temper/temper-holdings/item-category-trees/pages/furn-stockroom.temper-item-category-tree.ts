import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnStockroom = {
  id: "01a05fcf-f80f-7137-bc6d-daf5effa8d9e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-stockroom",
  title: "Stockroom",
  parent: "furn-hearth",
  displayOrder: 12,
  furnitureSubcategoryIds: [83],
} as const satisfies TemperItemCategoryTree
