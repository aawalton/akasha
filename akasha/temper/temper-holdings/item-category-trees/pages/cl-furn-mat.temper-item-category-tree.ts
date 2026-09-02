import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const clFurnMat = {
  id: "01a05fcf-f7c0-7b70-a653-e2810baad59b",
  pageTypeSlug: "temper-item-category-tree",
  slug: "cl-furn-mat",
  title: "Furnishing Materials",
  parent: "clothing",
  displayOrder: 0,
  filterTypes: [14],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
