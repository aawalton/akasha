import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const companionBattleAxe = {
  id: "01a05fcf-f7c4-7583-a6de-ab6d692ef962",
  pageTypeSlug: "temper-item-category-tree",
  slug: "companion-battle-axe",
  title: "Battle Axe",
  parent: "companion-two-handed",
  displayOrder: 1,
  weaponTypes: [5],
} as const satisfies TemperItemCategoryTree
