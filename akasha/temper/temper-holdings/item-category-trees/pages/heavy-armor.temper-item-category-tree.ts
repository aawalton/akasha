import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const heavyArmor = {
  id: "01a05fcf-f81f-7606-9925-a09f16dbe15e",
  pageTypeSlug: "temper-item-category-tree",
  slug: "heavy-armor",
  title: "Heavy Armor",
  parent: "armor",
  displayOrder: 3,
  armorTypes: [3],
} as const satisfies TemperItemCategoryTree
