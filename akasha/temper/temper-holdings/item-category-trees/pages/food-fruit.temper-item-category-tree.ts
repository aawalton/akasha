import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodFruit = {
  id: "01a05fcf-f7e1-7627-8db3-7f0a11c93e1a",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-fruit",
  title: "Fruit",
  parent: "food",
  displayOrder: 1,
  specializedItemTypes: [2],
} as const satisfies TemperItemCategoryTree
