import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionGloves = {
  id: "01a05fcf-f7c7-774c-90c9-abfc6c553c76",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-gloves",
  title: "Gloves",
  parent: "companion-light",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
