import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnSconces = {
  id: "01a05fcf-f80c-7d8d-bcfb-f52d44330910",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-sconces",
  title: "Sconces",
  parent: "furn-lighting",
  displayOrder: 8,
  furnitureSubcategoryIds: [122],
} as const satisfies TemperItemCategoryTree
