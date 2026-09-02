import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnFlyingPets = {
  id: "01a05fcf-f7f7-74ae-a383-17d055f2ce93",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-flying-pets",
  title: "Flying Pets",
  parent: "furn-pets",
  displayOrder: 4,
  furnitureSubcategoryIds: [41],
} as const satisfies TemperItemCategoryTree
