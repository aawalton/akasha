import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const weapons = {
  id: "01a05fcf-f849-76fb-8ffc-2e1ca5ddb70b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "weapons",
  title: "Weapons",
  parent: "equipment",
  displayOrder: 0,
  filterTypes: [1],
} as const satisfies TemperItemCategoryTree
