import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightGloves = {
  id: "01a05fcf-f827-7f6d-a6d9-8a3a30b21a28",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-gloves",
  title: "Gloves",
  parent: "light-armor",
  displayOrder: 3,
  equipTypes: [13],
} as const satisfies TemperItemCategoryTree
