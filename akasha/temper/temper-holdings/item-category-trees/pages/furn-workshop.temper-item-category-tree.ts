import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnWorkshop = {
  id: "01a05fcf-f81c-763e-9ca6-12843ccd1b82",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-workshop",
  title: "Workshop",
  parent: "furnishings",
  displayOrder: 8,
  furnitureCategoryIds: [9],
} as const satisfies TemperItemCategoryTree
