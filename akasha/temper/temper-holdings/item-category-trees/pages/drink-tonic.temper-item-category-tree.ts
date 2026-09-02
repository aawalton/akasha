import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const drinkTonic = {
  id: "01a05fcf-f7dd-7d86-b602-1c9bd8f551d3",
  pageTypeSlug: "temper-item-category-tree",
  slug: "drink-tonic",
  title: "Tonic",
  parent: "drink",
  displayOrder: 2,
  specializedItemTypes: [22],
} as const satisfies TemperItemCategoryTree
