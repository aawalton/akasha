import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const prFurnMat = {
  id: "01a05fcf-f832-7bda-998d-4a90603c2be7",
  pageTypeSlug: "temper-item-category-tree",
  slug: "pr-furn-mat",
  title: "Furnishing Materials",
  parent: "provisioning",
  displayOrder: 0,
  filterTypes: [18],
  itemTypes: [62],
} as const satisfies TemperItemCategoryTree
