import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const poisonSolvents = {
  id: "01a05fcf-f830-7722-80ea-c4ee4d577b09",
  pageTypeSlug: "temper-item-category-tree",
  slug: "poison-solvents",
  title: "Poison Solvents",
  parent: "alchemy",
  displayOrder: 3,
  itemTypes: [58],
} as const satisfies TemperItemCategoryTree
