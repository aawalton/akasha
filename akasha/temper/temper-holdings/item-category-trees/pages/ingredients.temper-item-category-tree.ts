import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const ingredients = {
  id: "01a05fcf-f822-7ada-b3b2-23e1ad6c7845",
  pageTypeSlug: "temper-item-category-tree",
  slug: "ingredients",
  title: "Ingredients",
  parent: "provisioning",
  displayOrder: 1,
  itemTypes: [10, 11, 27, 28],
} as const satisfies TemperItemCategoryTree
