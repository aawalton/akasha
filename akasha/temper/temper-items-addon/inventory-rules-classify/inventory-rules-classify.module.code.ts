import { ALL_CATEGORIES_ID } from "@akasha/temper-items-rules-core/inventory-rule-types"
import {
  CATEGORY_ROOTS,
  CATEGORY_TREE,
  type CategoryNode,
} from "../inventory-category-tree/inventory-category-tree.module.code.ts"
export function resolveCategoryNode(signals: ItemSignals, nodeId: string): string | undefined {
  const node = CATEGORY_TREE[nodeId]
  if (!node) return undefined

  if (hasSignals(node) && !matchesSignals(signals, node)) return undefined

  if (node.childIds) {
    for (const childId of node.childIds) {
      const deeper = resolveCategoryNode(signals, childId)
      if (deeper !== undefined) return deeper
    }
  }

  if (hasSignals(node)) return nodeId

  return undefined
}

export function classifyItem(signals: ItemSignals): string {
  for (const rootId of CATEGORY_ROOTS) {
    const result = resolveCategoryNode(signals, rootId)
    if (result !== undefined) return result
  }
  return "other"
}

export function getAncestorChain(nodeId: string): string[] {
  const chain: string[] = [nodeId]
  let current = nodeId
  while (true) {
    const node = CATEGORY_TREE[current]
    if (!node || node.parentId == null) break
    chain.push(node.parentId)
    current = node.parentId
  }
  chain.push(ALL_CATEGORIES_ID)
  return chain
}

export function gatherSignals(_bagId: number, _slotIndex: number, itemLink: string): ItemSignals {
  const [filterTypeBroad, filterTypeSpecific] = GetItemLinkFilterTypeInfo(itemLink)
  const filterType = filterTypeSpecific ?? filterTypeBroad
  const [itemType, specializedItemType] = GetItemLinkItemType(itemLink)
  const equipType = GetItemLinkEquipType(itemLink)
  const weaponType = GetItemLinkWeaponType(itemLink)
  const armorType = GetItemLinkArmorType(itemLink)
  const traitType = GetItemLinkTraitType(itemLink)

  let furnitureCategoryId = 0
  let furnitureSubcategoryId = 0
  if (filterType === 21) {
    const furnitureDataId = GetItemLinkFurnitureDataId(itemLink)
    if (furnitureDataId > 0) {
      const [catId, subcatId] = GetFurnitureDataCategoryInfo(furnitureDataId)
      if (catId !== undefined) furnitureCategoryId = catId
      if (subcatId !== undefined) furnitureSubcategoryId = subcatId
    }
  }

  const itemName = zo_strformat("<<1>>", GetItemLinkName(itemLink))

  return {
    filterType,
    itemType,
    specializedItemType,
    traitType,
    equipType,
    weaponType,
    armorType,
    furnitureCategoryId,
    furnitureSubcategoryId,
    itemName,
  }
}
export interface ItemSignals {
  filterType: number
  itemType: number
  specializedItemType: number
  traitType: number
  equipType: number
  weaponType: number
  armorType: number
  furnitureCategoryId: number
  furnitureSubcategoryId: number
  itemName: string
}

function arrayIncludes(arr: number[], value: number): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === value) return true
  }
  return false
}

function luaStringContains(haystack: string, needle: string): boolean {
  const [pos] = string.find(haystack, needle, 1, true)
  return pos !== undefined
}

export function hasSignals(node: CategoryNode): boolean {
  return !!(
    node.filterTypes ||
    node.itemTypes ||
    node.specializedItemTypes ||
    node.traitTypeRange ||
    node.equipTypes ||
    node.weaponTypes ||
    node.armorTypes ||
    node.furnitureCategoryIds ||
    node.furnitureSubcategoryIds ||
    node.itemNameContains
  )
}

export function matchesSignals(signals: ItemSignals, node: CategoryNode): boolean {
  if (node.filterTypes && !arrayIncludes(node.filterTypes, signals.filterType)) return false
  if (node.itemTypes && !arrayIncludes(node.itemTypes, signals.itemType)) return false
  if (node.specializedItemTypes) {
    if (signals.specializedItemType === 0) return false
    if (!arrayIncludes(node.specializedItemTypes, signals.specializedItemType)) return false
  }
  if (node.traitTypeRange) {
    if (signals.traitType === 0) return false
    if (signals.traitType < node.traitTypeRange[0] || signals.traitType > node.traitTypeRange[1])
      return false
  }
  if (node.equipTypes) {
    if (signals.equipType === 0) return false
    if (!arrayIncludes(node.equipTypes, signals.equipType)) return false
  }
  if (node.weaponTypes) {
    if (signals.weaponType === 0) return false
    if (!arrayIncludes(node.weaponTypes, signals.weaponType)) return false
  }
  if (node.armorTypes) {
    if (signals.armorType === 0) return false
    if (!arrayIncludes(node.armorTypes, signals.armorType)) return false
  }
  if (node.furnitureCategoryIds) {
    if (signals.furnitureCategoryId === 0) return false
    if (!arrayIncludes(node.furnitureCategoryIds, signals.furnitureCategoryId)) return false
  }
  if (node.furnitureSubcategoryIds) {
    if (signals.furnitureSubcategoryId === 0) return false
    if (!arrayIncludes(node.furnitureSubcategoryIds, signals.furnitureSubcategoryId)) return false
  }
  if (node.itemNameContains !== undefined) {
    if (signals.itemName === "") return false
    if (!luaStringContains(signals.itemName, node.itemNameContains)) return false
  }
  return true
}
