import type { ItemLocationEntry } from "@akasha/temper-items-core/item-centric-inventory"
export const BROWSER_QUALITY_ANY = 99

export type BrowserSortKey = "name" | "quality"

export type BrowserSearchMode = "name" | "set" | "both"

export type FixedLocationViewId =
  | "all"
  | "allBanks"
  | "allGuildBanks"
  | "allCharacters"
  | "allCompanions"
  | "allEquipped"
  | "allStorage"
  | "everything"
  | "bankOnly"
  | "bankAndCharacters"
  | "bankCurrentCharacter"
  | "bankOtherCharacters"
  | "craftBag"
  | "housingStorage"
  | "allHouses"

export type LocationViewKind = "fixed" | "character" | "companion" | "guildBank" | "houseBank"

export interface LocationViewOption {
  label: string
  kind: LocationViewKind
  fixedId?: FixedLocationViewId
  locationKey?: string
}

export interface BrowserRow {
  itemId: number
  itemLink: string
  itemName: string
  quality: number
  icon: string
  aggregatedQty: number
  worn: boolean
  wornCompanion: boolean
  stolen: boolean
  setName: string
  itemType: number
  specializedItemType: number
  weaponType: number
  armorType: number
  equipType: number
  furnitureCategoryId: number
  furnitureSubcategoryId: number
  isCompanionItem: boolean
  isFurnishing: boolean
  locations: readonly ItemLocationEntry[]
}

export interface SubfilterDef {
  label: string
  category: string
  buildTypes: (this: void) => number[]
}

export interface CategoryDef {
  label: string
  category: string
  buildTypes: (this: void) => number[]
  subfilters: readonly SubfilterDef[]
}

export interface BrowserFilterState {
  category: string
  subfilterTypes: readonly number[]
  quality: number
  locationOption: LocationViewOption
  searchText: string
  searchMode: BrowserSearchMode
  sortKey: BrowserSortKey
  sortAscending: boolean
}
