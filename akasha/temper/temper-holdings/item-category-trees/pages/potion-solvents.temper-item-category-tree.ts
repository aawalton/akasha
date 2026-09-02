import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const potionSolvents = {
  id: "01a05fcf-f831-73e6-ab75-9e2115bd7ed1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "potion-solvents",
  title: "Potion Solvents",
  parent: "alchemy",
  displayOrder: 2,
  itemTypes: [33],
} as const satisfies TemperItemCategoryTree
