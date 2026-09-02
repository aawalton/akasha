import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnParlor = {
  id: "01a05fcf-f806-707e-a9db-431d8b7b42e7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-parlor",
  title: "Parlor",
  parent: "furnishings",
  displayOrder: 1,
  furnitureCategoryIds: [2],
} as const satisfies TemperItemCategoryTree
