import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionSash = {
  id: "01a05fcf-f7d0-7e3f-8675-9e6789b7f388",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-sash",
  title: "Sash",
  parent: "companion-light",
  displayOrder: 4,
  equipTypes: [8],
} as const satisfies TemperItemCategoryTree
