import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnFlowers = {
  id: "01a05fcf-f7f7-7ed7-b739-060e6b3e4588",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-flowers",
  title: "Flowers",
  parent: "furn-conservatory",
  displayOrder: 5,
  furnitureSubcategoryIds: [110],
} as const satisfies TemperItemCategoryTree
