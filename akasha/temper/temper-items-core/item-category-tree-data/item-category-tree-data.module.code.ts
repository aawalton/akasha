import { ITEM_CATEGORY_TREE_ENTRIES_00 } from "../item-category-tree-entries-00/item-category-tree-entries-00.module.code.ts"
import { ITEM_CATEGORY_TREE_ENTRIES_01 } from "../item-category-tree-entries-01/item-category-tree-entries-01.module.code.ts"
import { ITEM_CATEGORY_TREE_ENTRIES_02 } from "../item-category-tree-entries-02/item-category-tree-entries-02.module.code.ts"
import { ITEM_CATEGORY_TREE_ENTRIES_03 } from "../item-category-tree-entries-03/item-category-tree-entries-03.module.code.ts"
import { ITEM_CATEGORY_TREE_FURNISHINGS_00 } from "../item-category-tree-furnishings-00/item-category-tree-furnishings-00.module.code.ts"
import { ITEM_CATEGORY_TREE_FURNISHINGS_01 } from "../item-category-tree-furnishings-01/item-category-tree-furnishings-01.module.code.ts"
import type { ItemCategoryTree } from "../item-category-tree-types/item-category-tree-types.module.code.ts"

export const ITEM_CATEGORY_PRIORITY = [
  "currency",
  "companion",
  "knowledge",
  "tasks",
  "consumables",
  "equipment",
  "crafting",
  "furnishings",
  "miscellaneous",
] as const

export const ITEM_CATEGORY_TREE = {
  "currency": ITEM_CATEGORY_TREE_ENTRIES_00.currency,
  "companion": ITEM_CATEGORY_TREE_ENTRIES_00.companion,
  "knowledge": ITEM_CATEGORY_TREE_ENTRIES_00.knowledge,
  "tasks": ITEM_CATEGORY_TREE_ENTRIES_01.tasks,
  "consumables": ITEM_CATEGORY_TREE_ENTRIES_01.consumables,
  "equipment": ITEM_CATEGORY_TREE_ENTRIES_01.equipment,
  "crafting": ITEM_CATEGORY_TREE_ENTRIES_02.crafting,
  "furnishings": {
    id: "furnishings",
    name: "Furnishings",
    filterTypes: [21],
    children: [...ITEM_CATEGORY_TREE_FURNISHINGS_00, ...ITEM_CATEGORY_TREE_FURNISHINGS_01],
  },
  "miscellaneous": ITEM_CATEGORY_TREE_ENTRIES_03.miscellaneous,
} as const satisfies ItemCategoryTree
