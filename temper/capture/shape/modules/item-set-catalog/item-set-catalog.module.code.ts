export interface ItemSetCatalogPiece {
  name: string
  itemId?: number
  armorType?: number
  equipType?: number
  weaponType?: number
}

export interface ItemSetCatalogEntry {
  name: string
  categoryName?: string
  subcategoryName?: string
  totalSlots: number
  pieces: readonly ItemSetCatalogPiece[]
}
