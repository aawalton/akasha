import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightShoes = {
  id: "01a05fcf-f828-7cdc-bce9-58655524f23d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-shoes",
  title: "Shoes",
  parent: "light-armor",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
