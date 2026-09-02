import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const potions = {
  id: "01a05fcf-f831-7324-a22d-c91221d0b896",
  pageTypeSlug: "temper-item-category-tree",
  slug: "potions",
  title: "Potions",
  parent: "consumables",
  displayOrder: 2,
  itemTypes: [7],
} as const satisfies TemperItemCategoryTree
