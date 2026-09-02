import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const crownItems = {
  id: "01a05fcf-f7d6-74f6-9e3a-9ac60d6e3d94",
  pageTypeSlug: "temper-item-category-tree",
  slug: "crown-items",
  title: "Crown Items",
  parent: "consumables",
  displayOrder: 8,
  itemTypes: [57],
} as const satisfies TemperItemCategoryTree
