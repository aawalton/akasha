import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionNecklace = {
  id: "01a05fcf-f7cd-7516-9b54-fde4dbd567ba",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-necklace",
  title: "Necklace",
  parent: "companion-jewelry",
  displayOrder: 0,
  equipTypes: [2],
} as const satisfies TemperItemCategoryTree
