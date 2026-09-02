import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const foodGourmet = {
  id: "01a05fcf-f7e2-7930-bb87-79e3428069f5",
  pageTypeSlug: "temper-item-category-tree",
  slug: "food-gourmet",
  title: "Gourmet",
  parent: "food",
  displayOrder: 6,
  specializedItemTypes: [7],
} as const satisfies TemperItemCategoryTree
