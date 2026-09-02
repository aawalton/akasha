import { classifyItem } from "../classify-item/classify-item.module.code.ts"
import { esoTraitToTemperId } from "../eso-trait-reverse-map/eso-trait-reverse-map.module.code.ts"
import { computeValue } from "../inventory-display-value/inventory-display-value.module.code.ts"
import {
  INVENTORY_TYPE_CATEGORY_ORDER,
  type InventoryItemRow,
  type InventoryTypeCategory,
  type InventoryTypeEntry,
  type InventoryTypeGroup,
  type InventoryTypeSummary,
  isInventoryTypeCategory,
} from "../inventory-grouping-types/inventory-grouping-types.module.code.ts"
import type {
  InventoryDatabase,
  InventoryLocationData,
} from "../inventory-types/inventory-types.module.code.ts"
import type { CategoryPath } from "../item-category-tree-types/item-category-tree-types.module.code.ts"
import {
  classifyLocation,
  getLocationDisplayName,
} from "../location-classify/location-classify.module.code.ts"
import {
  type LocationTypeId,
  locationTypes,
} from "../location-type-data/location-type-data.module.code.ts"

interface FilterableGroup {
  items: readonly InventoryItemRow[]
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
}

export function filterInventoryGroups<T extends FilterableGroup>(
  groups: readonly T[],
  search: string,
  qualities: readonly number[],
  traits: readonly string[] = []
): readonly T[] {
  const searchLower = search.toLowerCase().trim()
  const qualitySet = qualities.length > 0 ? new Set(qualities) : null
  const traitSet = traits.length > 0 ? new Set(traits) : null

  const result: T[] = []
  for (const group of groups) {
    const filtered = group.items.filter((item) => {
      if (searchLower !== "" && !item.itemName.toLowerCase().includes(searchLower)) return false
      if (qualitySet && !qualitySet.has(item.quality)) return false
      if (traitSet) {
        const traitId = esoTraitToTemperId(item.traitType, item.equipType)
        if (traitId == null || !traitSet.has(traitId)) return false
      }
      return true
    })

    if (filtered.length === 0) continue

    let totalItems = 0
    let totalValue: number | undefined
    let hasValue = false

    for (const item of filtered) {
      totalItems += item.stackCount
      if (item.value !== undefined) {
        hasValue = true
        totalValue = (totalValue ?? 0) + item.value * item.stackCount
      }
    }

    result.push({
      ...group,
      items: filtered,
      totalItems,
      occupiedSlots: filtered.length,
      totalValue: hasValue ? totalValue : undefined,
    })
  }
  return result
}

export interface InventoryLocationGroup {
  locationKey: string
  displayName: string
  locationType: LocationTypeId
  lastScanned: number
  items: readonly InventoryItemRow[]
  totalItems: number
  occupiedSlots: number
  bagCapacity?: number
  bagCapacities?: Record<number, number>
  totalValue: number | undefined
}

export interface InventoryLocationSummary {
  totalItems: number
  occupiedSlots: number
  totalValue: number | undefined
  groups: readonly InventoryLocationGroup[]
}

const LOCATION_TYPE_ORDER: LocationTypeId[] = [...locationTypes.ids]

const CAPACITY_LOCATION_TYPES: ReadonlySet<LocationTypeId> = new Set([
  "character",
  "bank",
  "housing-storage",
  "guild",
])

const KNOWN_LOCATION_CAPACITIES: Partial<Record<string, number>> = {
  FurnitureVault: 500,
}

function sumBagSizes(bagSizes: Record<number, number> | undefined): number | undefined {
  if (!bagSizes) return undefined
  const entries = Object.values(bagSizes)
  if (entries.length === 0) return undefined
  let total = 0
  for (const size of entries) total += size
  return total
}

function flattenLocationItems(
  locationKey: string,
  location: InventoryLocationData
): readonly InventoryItemRow[] {
  const items: InventoryItemRow[] = []

  for (const [bagId, slots] of Object.entries(location.bags)) {
    const numericBagId = Number(bagId)
    for (const [slotIndex, item] of Object.entries(slots)) {
      const row: InventoryItemRow = {
        key: `${locationKey}-${bagId}-${slotIndex}`,
        itemName: item.itemName,
        quality: item.quality,
        stackCount: item.stackCount,
        value: computeValue(item.estimatedValue, item.merchantValue, item.replacementCost),
        filterType: item.filterType,
        itemType: item.itemType,
        specializedItemType: item.specializedItemType,
        traitType: item.traitType,
        equipType: item.equipType,
        weaponType: item.weaponType,
        armorType: item.armorType,
        furnitureCategory: item.furnitureCategory,
        furnitureCategoryId: item.furnitureCategoryId,
        furnitureSubcategoryId: item.furnitureSubcategoryId,
        bagId: numericBagId,
        stolen: item.stolen,
        bound: item.bound,
        itemLink: item.itemLink,
        requiredLevel: item.requiredLevel,
      }
      if (item.replacementCost !== undefined) row.replacementValue = item.replacementCost
      if (item.merchantValue !== undefined) row.merchantValue = item.merchantValue
      if (item.saleAvg !== undefined) row.saleAvg = item.saleAvg
      if (item.minPrice !== undefined) row.minPrice = item.minPrice
      if (item.amountCount !== undefined) row.amountCount = item.amountCount
      if (item.saleAmountCount !== undefined) row.saleAmountCount = item.saleAmountCount
      if (item.suggestedPrice !== undefined) row.suggestedPrice = item.suggestedPrice
      items.push(row)
    }
  }

  if (location.placedFurnishings) {
    for (const [furnKey, furnishing] of Object.entries(location.placedFurnishings)) {
      if (furnishing.itemLink === "") continue
      const furnRow: InventoryItemRow = {
        key: `${locationKey}-placed-${furnKey}`,
        itemName: furnishing.itemName,
        quality: furnishing.quality,
        stackCount: 1,
        value: furnishing.estimatedValue,
        filterType: 0,
        itemType: 0,
        traitType: 0,
      }
      if (furnishing.saleAvg !== undefined) furnRow.saleAvg = furnishing.saleAvg
      if (furnishing.minPrice !== undefined) furnRow.minPrice = furnishing.minPrice
      if (furnishing.amountCount !== undefined) furnRow.amountCount = furnishing.amountCount
      if (furnishing.saleAmountCount !== undefined)
        furnRow.saleAmountCount = furnishing.saleAmountCount
      if (furnishing.suggestedPrice !== undefined)
        furnRow.suggestedPrice = furnishing.suggestedPrice
      items.push(furnRow)
    }
  }

  return items
}

export function groupInventoryByLocation(inventory: InventoryDatabase): InventoryLocationSummary {
  const locationGroups: InventoryLocationGroup[] = []
  let totalItems = 0
  let totalOccupiedSlots = 0
  let totalValue: number | undefined
  let hasAnyValue = false

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    const flattened = flattenLocationItems(locationKey, location)
    if (flattened.length === 0) continue

    const items = flattened.toSorted((a, b) => {
      const byQuality = b.quality - a.quality
      return byQuality !== 0 ? byQuality : a.itemName.localeCompare(b.itemName)
    })

    let groupTotal = 0
    let groupValue: number | undefined
    let groupHasValue = false

    for (const item of items) {
      groupTotal += item.stackCount
      if (item.value !== undefined) {
        groupHasValue = true
        groupValue = (groupValue ?? 0) + item.value * item.stackCount
      }
    }

    const locationType = classifyLocation(locationKey)
    const bagCapacity = CAPACITY_LOCATION_TYPES.has(locationType)
      ? (sumBagSizes(location.bagSizes) ?? KNOWN_LOCATION_CAPACITIES[locationKey])
      : undefined

    const group: InventoryLocationGroup = {
      locationKey,
      displayName: getLocationDisplayName(locationKey, location.displayName),
      locationType,
      lastScanned: location.lastScanned,
      items,
      totalItems: groupTotal,
      occupiedSlots: items.length,
      totalValue: groupHasValue ? groupValue : undefined,
    }
    if (bagCapacity !== undefined) group.bagCapacity = bagCapacity
    if (locationType === "character" && location.bagSizes) {
      group.bagCapacities = { ...location.bagSizes }
    }

    locationGroups.push(group)

    totalItems += groupTotal
    totalOccupiedSlots += items.length
    if (groupHasValue) {
      hasAnyValue = true
      totalValue = (totalValue ?? 0) + (groupValue ?? 0)
    }
  }

  locationGroups.sort((a, b) => {
    const typeA = LOCATION_TYPE_ORDER.indexOf(a.locationType)
    const typeB = LOCATION_TYPE_ORDER.indexOf(b.locationType)
    if (typeA !== typeB) return typeA - typeB
    return a.displayName.localeCompare(b.displayName)
  })

  return {
    totalItems,
    occupiedSlots: totalOccupiedSlots,
    totalValue: hasAnyValue ? totalValue : undefined,
    groups: locationGroups,
  }
}

export function groupInventoryByType(inventory: InventoryDatabase): InventoryTypeSummary {
  const categoryMap = new Map<InventoryTypeCategory, InventoryTypeEntry[]>()

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    for (const row of flattenLocationItems(locationKey, location)) {
      const path = row.key.includes("-placed-")
        ? (["Furnishings", "Placed"] satisfies CategoryPath)
        : classifyItem(row)
      const head = path[0]
      const category: InventoryTypeCategory = isInventoryTypeCategory(head) ? head : "Miscellaneous"

      let entries = categoryMap.get(category)
      if (!entries) {
        entries = []
        categoryMap.set(category, entries)
      }
      entries.push({ row, path })
    }
  }

  const groups: InventoryTypeGroup[] = []
  let totalItems = 0
  let totalOccupiedSlots = 0
  let totalValue: number | undefined
  let hasAnyValue = false

  for (const category of INVENTORY_TYPE_CATEGORY_ORDER) {
    const entries = categoryMap.get(category)
    if (!entries || entries.length === 0) continue

    entries.sort((a, b) => {
      const byQuality = b.row.quality - a.row.quality
      return byQuality !== 0 ? byQuality : a.row.itemName.localeCompare(b.row.itemName)
    })

    let groupTotal = 0
    let groupValue: number | undefined
    let groupHasValue = false

    for (const { row } of entries) {
      groupTotal += row.stackCount
      if (row.value !== undefined) {
        groupHasValue = true
        groupValue = (groupValue ?? 0) + row.value * row.stackCount
      }
    }

    groups.push({
      category,
      entries,
      totalItems: groupTotal,
      occupiedSlots: entries.length,
      totalValue: groupHasValue ? groupValue : undefined,
    })

    totalItems += groupTotal
    totalOccupiedSlots += entries.length
    if (groupHasValue) {
      hasAnyValue = true
      totalValue = (totalValue ?? 0) + (groupValue ?? 0)
    }
  }

  return {
    totalItems,
    occupiedSlots: totalOccupiedSlots,
    totalValue: hasAnyValue ? totalValue : undefined,
    groups,
  }
}

export function filterInventoryTypeGroups(
  groups: readonly InventoryTypeGroup[],
  search: string,
  qualities: readonly number[],
  traits: readonly string[] = []
): readonly InventoryTypeGroup[] {
  const searchLower = search.toLowerCase().trim()
  const qualitySet = qualities.length > 0 ? new Set(qualities) : null
  const traitSet = traits.length > 0 ? new Set(traits) : null

  const result: InventoryTypeGroup[] = []
  for (const group of groups) {
    const filtered = group.entries.filter(({ row }) => {
      if (searchLower !== "" && !row.itemName.toLowerCase().includes(searchLower)) return false
      if (qualitySet && !qualitySet.has(row.quality)) return false
      if (traitSet) {
        const traitId = esoTraitToTemperId(row.traitType, row.equipType)
        if (traitId == null || !traitSet.has(traitId)) return false
      }
      return true
    })

    if (filtered.length === 0) continue

    let totalItems = 0
    let totalValue: number | undefined
    let hasValue = false

    for (const { row } of filtered) {
      totalItems += row.stackCount
      if (row.value !== undefined) {
        hasValue = true
        totalValue = (totalValue ?? 0) + row.value * row.stackCount
      }
    }

    result.push({
      ...group,
      entries: filtered,
      totalItems,
      occupiedSlots: filtered.length,
      totalValue: hasValue ? totalValue : undefined,
    })
  }
  return result
}
