import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const trophies = {
  id: "01a05fcf-f846-77dc-9c7f-f67085d7d9e1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "trophies",
  title: "Trophies",
  parent: "miscellaneous",
  displayOrder: 5,
  itemTypes: [5],
} as const satisfies TemperItemCategoryTree
