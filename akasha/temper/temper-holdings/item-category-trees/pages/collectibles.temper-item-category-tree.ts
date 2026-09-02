import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const collectibles = {
  id: "01a05fcf-f7c2-7335-b2f8-f8dbe51f4307",
  pageTypeSlug: "temper-item-category-tree",
  slug: "collectibles",
  title: "Collectibles",
  parent: "miscellaneous",
  displayOrder: 6,
  filterTypes: [12],
} as const satisfies TemperItemCategoryTree
