import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnMusicBoxes = {
  id: "01a05fcf-f804-7481-ac22-e461eb193ed1",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-music-boxes",
  title: "Music Boxes",
  parent: "furn-services",
  displayOrder: 8,
  furnitureSubcategoryIds: [181],
} as const satisfies TemperItemCategoryTree
