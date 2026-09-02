import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const wwFurnMat = {
  id: "01a05fcf-f849-7409-9d6e-885afb8ccc03",
  pageTypeSlug: "temper-item-category-tree",
  slug: "ww-furn-mat",
  title: "Furnishing Materials",
  parent: "woodworking",
  displayOrder: 0,
  filterTypes: [15],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
