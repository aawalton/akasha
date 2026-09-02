import type { CategoryPath } from "../item-category-tree-types/item-category-tree-types.module.code.ts"

export interface InventoryItemRow {
  key: string
  itemName: string
  quality: number
  itemLink?: string
  requiredLevel?: number
  stackCount: number
  value: number | undefined
  filterType: number
  itemType: number
  specializedItemType?: number
  traitType: number
  equipType?: number
  weaponType?: number
  armorType?: number
  furnitureCategory?: string
  furnitureCategoryId?: number
  furnitureSubcategoryId?: number
  bagId?: number
  stolen?: boolean
  bound?: boolean
  replacementValue?: number
  merchantValue?: number
  saleAvg?: number
  minPrice?: number
  amountCount?: number
  saleAmountCount?: number
  suggestedPrice?: number
}

export type InventoryTypeCategory =
  | "Companion"
  | "Knowledge"
  | "Tasks"
  | "Consumables"
  | "Equipment"
  | "Crafting"
  | "Furnishings"
  | "Miscellaneous"

export const INVENTORY_TYPE_CATEGORY_ORDER: InventoryTypeCategory[] = [
  "Companion",
  "Knowledge",
  "Tasks",
  "Consumables",
  "Equipment",
  "Crafting",
  "Furnishings",
  "Miscellaneous",
]

const INVENTORY_TYPE_CATEGORY_SET = new Set<string>(INVENTORY_TYPE_CATEGORY_ORDER)

export function isInventoryTypeCategory(value: unknown): value is InventoryTypeCategory {
  return typeof value === "string" && INVENTORY_TYPE_CATEGORY_SET.has(value)
}

export interface InventoryTypeEntry {
  row: InventoryItemRow
  path: CategoryPath
}

export interface InventoryTypeGroup {
  category: InventoryTypeCategory
  entries: readonly InventoryTypeEntry[]
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
}

export interface InventoryTypeSummary {
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
  groups: readonly InventoryTypeGroup[]
}
