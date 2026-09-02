import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnTrees = {
  id: "01a05fcf-f816-79ed-8d92-46751cf097ef",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-trees",
  title: "Trees",
  parent: "furn-conservatory",
  displayOrder: 14,
  furnitureSubcategoryIds: [107],
} as const satisfies TemperItemCategoryTree
