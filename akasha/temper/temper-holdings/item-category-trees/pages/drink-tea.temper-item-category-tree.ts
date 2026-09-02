import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkTea = {
  id: "01a05fcf-f7dc-7df5-afcf-53397efcbc9b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-tea",
  title: "Tea",
  parent: "drink",
  displayOrder: 1,
  specializedItemTypes: [21],
} as const satisfies TemperItemCategoryTree
