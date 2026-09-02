import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const mediumBelt = {
  id: "01a05fcf-f82b-767f-99d9-0c98435a473b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "medium-belt",
  title: "Belt",
  parent: "medium-armor",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
