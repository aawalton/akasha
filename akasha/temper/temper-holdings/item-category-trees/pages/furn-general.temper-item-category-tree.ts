import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnGeneral = {
  id: "01a05fcf-f7f9-720c-8816-7ee884282382",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-general",
  title: "General",
  parent: "furn-miscellaneous",
  displayOrder: 2,
  furnitureSubcategoryIds: [167],
} as const satisfies TemperItemCategoryTree
