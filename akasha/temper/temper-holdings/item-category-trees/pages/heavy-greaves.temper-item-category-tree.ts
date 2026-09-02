import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyGreaves = {
  id: "01a05fcf-f820-7ad7-b05c-e65043a8f7fe",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-greaves",
  title: "Greaves",
  parent: "heavy-armor",
  displayOrder: 5,
  equipTypes: [9],
} as const satisfies TemperItemCategoryTree
