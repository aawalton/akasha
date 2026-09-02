import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightRobe = {
  id: "01a05fcf-f828-7972-90e0-1f2bdb3e09c9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-robe",
  title: "Robe / Jerkin",
  parent: "light-armor",
  displayOrder: 1,
  equipTypes: [3],
} as const satisfies TemperItemCategoryTree
