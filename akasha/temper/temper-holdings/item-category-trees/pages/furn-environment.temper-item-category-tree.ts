import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnEnvironment = {
  id: "01a05fcf-f7f5-7f8f-9e27-5348d8e023f9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-environment",
  title: "Environment",
  parent: "furn-miscellaneous",
  displayOrder: 1,
  furnitureSubcategoryIds: [166],
} as const satisfies TemperItemCategoryTree
