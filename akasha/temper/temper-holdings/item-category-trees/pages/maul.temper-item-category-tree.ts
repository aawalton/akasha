import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const maul = {
  id: "01a05fcf-f82a-73c1-a481-6157d0531377",
  pageTypeSlug: "temper-item-category-tree",
  slug: "maul",
  title: "Maul",
  parent: "two-handed",
  displayOrder: 2,
  weaponTypes: [6],
} as const satisfies TemperItemCategoryTree
