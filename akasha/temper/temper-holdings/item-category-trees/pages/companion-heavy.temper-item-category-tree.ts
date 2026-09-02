import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionHeavy = {
  id: "01a05fcf-f7c9-7762-9137-7be0453b8d1d",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-heavy",
  title: "Heavy Armor",
  parent: "companion-armor",
  displayOrder: 3,
  armorTypes: [3],
} as const satisfies TemperItemCategoryTree
