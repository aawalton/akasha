import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnFerns = {
  id: "01a05fcf-f7f6-7488-9734-889763fc00aa",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-ferns",
  title: "Ferns",
  parent: "furn-conservatory",
  displayOrder: 4,
  furnitureSubcategoryIds: [148],
} as const satisfies TemperItemCategoryTree
