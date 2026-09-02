import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const twoHanded = {
  id: "01a05fcf-f848-7098-8e8e-f3a609a0f647",
  pageTypeSlug: "temper-item-category-tree",
  slug: "two-handed",
  title: "Two-Handed",
  parent: "weapons",
  displayOrder: 1,
  equipTypes: [6],
  weaponTypes: [4, 5, 6],
} as const satisfies TemperItemCategoryTree
