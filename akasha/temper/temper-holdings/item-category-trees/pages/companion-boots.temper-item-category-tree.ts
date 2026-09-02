import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionBoots = {
  id: "01a05fcf-f7c4-7e13-80e8-8839e6770191",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-boots",
  title: "Boots",
  parent: "companion-medium",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
