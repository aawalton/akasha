import type { TemperItemCategoryTree } from "../temper-item-category-tree.page-type.ts"

export const skillScrolls = {
  id: "01a05fcf-f83f-7dfa-90a1-0731f2897aa0",
  pageTypeSlug: "temper-item-category-tree",
  slug: "skill-scrolls",
  title: "Skill Scrolls",
  parent: "consumables",
  displayOrder: 10,
  itemTypes: [76],
} as const satisfies TemperItemCategoryTree
