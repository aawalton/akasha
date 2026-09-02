import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnPottery = {
  id: "01a05fcf-f809-737a-a32f-152023c8626d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-pottery",
  title: "Pottery",
  parent: "furn-hearth",
  displayOrder: 10,
  furnitureSubcategoryIds: [79],
} as const satisfies TemperItemCategoryTree
