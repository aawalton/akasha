import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCreatures = {
  id: "01a05fcf-f7ef-7bc5-8e68-daaec36155b9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-creatures",
  title: "Creatures",
  parent: "furn-miscellaneous",
  displayOrder: 0,
  furnitureSubcategoryIds: [161],
} as const satisfies TemperItemCategoryTree
