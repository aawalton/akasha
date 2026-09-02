import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const poisons = {
  id: "01a05fcf-f830-714c-b4a6-b3c97658d357",
  pageTypeSlug: "temper-item-category-tree",
  slug: "poisons",
  title: "Poisons",
  parent: "consumables",
  displayOrder: 3,
  itemTypes: [30],
} as const satisfies TemperItemCategoryTree
