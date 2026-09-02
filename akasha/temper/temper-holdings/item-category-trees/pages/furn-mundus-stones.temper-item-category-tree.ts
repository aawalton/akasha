import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMundusStones = {
  id: "01a05fcf-f804-72d8-a54e-978605111ab5",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-mundus-stones",
  title: "Mundus Stones",
  parent: "furn-services",
  displayOrder: 7,
  furnitureSubcategoryIds: [159],
} as const satisfies TemperItemCategoryTree
