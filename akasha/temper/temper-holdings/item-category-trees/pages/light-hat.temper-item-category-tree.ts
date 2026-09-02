import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const lightHat = {
  id: "01a05fcf-f827-72d4-9673-8785e7a83556",
  pageTypeSlug: "temper-item-category-tree",
  slug: "light-hat",
  title: "Hat",
  parent: "light-armor",
  displayOrder: 0,
  equipTypes: [1],
} as const satisfies TemperItemCategoryTree
