import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnLiterature = {
  id: "01a05fcf-f800-7900-ae56-cc0b7ef6574f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-literature",
  title: "Literature",
  parent: "furn-library",
  displayOrder: 1,
  furnitureSubcategoryIds: [61],
} as const satisfies TemperItemCategoryTree
