export interface InventoryConstantsCatalogData {
  itemTypes: Record<string, number>
  itemFilterTypes: Record<string, number>
  specializedItemTypes: Record<string, number>
  displayCategories: Record<string, number>
  itemTypeLabels: Record<number, string>
  itemFilterTypeLabels: Record<number, string>
  displayCategoryLabels: Record<number, string>
  equipTypes: Record<string, number>
  weaponTypes: Record<string, number>
  armorTypes: Record<string, number>
}
