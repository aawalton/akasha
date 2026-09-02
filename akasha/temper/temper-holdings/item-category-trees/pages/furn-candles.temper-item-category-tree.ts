import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCandles = {
  id: "01a05fcf-f7ec-7cd3-b3eb-0c6b176bca0f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-candles",
  title: "Candles",
  parent: "furn-lighting",
  displayOrder: 1,
  furnitureSubcategoryIds: [128],
} as const satisfies TemperItemCategoryTree
