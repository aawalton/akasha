import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const siegeOil = {
  id: "01a05fcf-f83e-7498-8606-b7fbed83b6ea",
  pageTypeSlug: "temper-item-category-tree",
  slug: "siege-oil",
  title: "Boiling Oil",
  parent: "siege-equipment",
  displayOrder: 3,
  specializedItemTypes: [407],
} as const satisfies TemperItemCategoryTree
