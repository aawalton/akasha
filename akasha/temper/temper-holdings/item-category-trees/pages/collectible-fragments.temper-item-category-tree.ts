import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const collectibleFragments = {
  id: "01a05fcf-f7c1-7656-b545-dd52bf382aa8",
  pageTypeSlug: "temper-item-category-tree",
  slug: "collectible-fragments",
  title: "Collectible Fragments",
  parent: "knowledge-collectibles",
  displayOrder: 1,
  specializedItemTypes: [109],
} as const satisfies TemperItemCategoryTree
