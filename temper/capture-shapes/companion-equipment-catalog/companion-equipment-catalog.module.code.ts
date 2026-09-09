export interface CompanionEquipmentCatalogTraitTypes {
  armor: Record<string, number>
  jewelry: Record<string, number>
  weapon: Record<string, number>
  none: number
}

export interface CompanionEquipmentCatalogData {
  traitTypes: CompanionEquipmentCatalogTraitTypes
  qualityTypes: Record<string, number>
  armorTypes: Record<string, number>
  weaponTypes: Record<string, number>
  equipTypes: Record<string, number>
  filterTypes: { ITEMFILTERTYPE_COMPANION: number }
}
