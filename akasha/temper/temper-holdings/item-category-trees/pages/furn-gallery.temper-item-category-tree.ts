import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const furnGallery = {
  id: "01a05fcf-f7f8-736c-a286-117346e23fb9",
  pageTypeSlug: "temper-item-category-tree",
  slug: "furn-gallery",
  title: "Gallery",
  parent: "furnishings",
  displayOrder: 7,
  furnitureCategoryIds: [8],
} as const satisfies TemperItemCategoryTree
