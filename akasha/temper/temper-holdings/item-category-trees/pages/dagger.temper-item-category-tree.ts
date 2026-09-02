import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const dagger = {
  id: "01a05fcf-f7d9-7477-9f09-207fb112a961",
  pageTypeSlug: "temper-item-category-tree",
  slug: "dagger",
  title: "Dagger",
  parent: "one-handed",
  displayOrder: 3,
  weaponTypes: [11],
} as const satisfies TemperItemCategoryTree
