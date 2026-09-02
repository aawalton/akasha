import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnCamels = {
  id: "01a05fcf-f7ec-7054-ba7c-965c58f25e56",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-camels",
  title: "Camels",
  parent: "furn-mounts",
  displayOrder: 3,
  furnitureSubcategoryIds: [178],
} as const satisfies TemperItemCategoryTree
