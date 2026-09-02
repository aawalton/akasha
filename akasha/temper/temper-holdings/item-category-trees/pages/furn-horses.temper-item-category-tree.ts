import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnHorses = {
  id: "01a05fcf-f7fb-719d-a490-6bc5109de89f",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-horses",
  title: "Horses",
  parent: "furn-mounts",
  displayOrder: 9,
  furnitureSubcategoryIds: [23],
} as const satisfies TemperItemCategoryTree
