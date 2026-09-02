import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionShoes = {
  id: "01a05fcf-f7d0-7f58-bf2d-5991ce1f5875",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-shoes",
  title: "Shoes",
  parent: "companion-light",
  displayOrder: 6,
  equipTypes: [10],
} as const satisfies TemperItemCategoryTree
