import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnDeadWood = {
  id: "01a05fcf-f7f0-7850-b1ec-ecbf1d04cfe6",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-dead-wood",
  title: "Dead Wood",
  parent: "furn-conservatory",
  displayOrder: 3,
  furnitureSubcategoryIds: [164],
} as const satisfies TemperItemCategoryTree
