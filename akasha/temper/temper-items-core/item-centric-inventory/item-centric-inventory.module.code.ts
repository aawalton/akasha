import { ESO_BAG_WORN } from "../eso-bag-constants/eso-bag-constants.module.code.ts"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "../inventory-types/inventory-types.module.code.ts"
import {
  classifyLocation,
  getLocationDisplayName,
} from "../location-classify/location-classify.module.code.ts"
import {
  type LocationTypeId,
  locationTypes,
} from "../location-type-data/location-type-data.module.code.ts"

export interface ItemLocationEntry {
  locationKey: string
  locationType: LocationTypeId
  displayName: string
  bagId: number
  slotIndex: number
  stackCount: number
  lastScanned: number
}

export interface ItemCentricEntry {
  itemId: number
  item: InventoryItemData
  aggregatedQty: number
  worn: boolean
  wornCompanion: boolean
  locations: readonly ItemLocationEntry[]
}

const LOCATION_TYPE_ORDER: readonly LocationTypeId[] = locationTypes.ids

export function compareStrings(a: string, b: string): number {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

function compareLocations(a: ItemLocationEntry, b: ItemLocationEntry): number {
  const byType =
    LOCATION_TYPE_ORDER.indexOf(a.locationType) - LOCATION_TYPE_ORDER.indexOf(b.locationType)
  if (byType !== 0) return byType
  const byName = compareStrings(a.displayName, b.displayName)
  if (byName !== 0) return byName
  if (a.bagId !== b.bagId) return a.bagId - b.bagId
  return a.slotIndex - b.slotIndex
}

export function buildItemCentricInventory(
  inventory: InventoryDatabase | null
): Map<number, ItemCentricEntry> {
  const result = new Map<number, ItemCentricEntry>()
  if (inventory === null) return result

  const locationsById = new Map<number, ItemLocationEntry[]>()

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    const locationType = classifyLocation(locationKey)
    const displayName = getLocationDisplayName(locationKey, location.displayName)
    const lastScanned = location.lastScanned

    for (const [bagIdKey, slots] of Object.entries(location.bags)) {
      const bagId = Number(bagIdKey)
      const isWorn = locationType === "character" && bagId === ESO_BAG_WORN
      const isCompanion = locationType === "companion"

      for (const [slotIndexKey, item] of Object.entries(slots)) {
        let entry = result.get(item.itemId)
        let locations = locationsById.get(item.itemId)
        if (entry === undefined || locations === undefined) {
          locations = []
          entry = {
            itemId: item.itemId,
            item,
            aggregatedQty: 0,
            worn: false,
            wornCompanion: false,
            locations,
          }
          result.set(item.itemId, entry)
          locationsById.set(item.itemId, locations)
        }

        entry.aggregatedQty += item.stackCount
        if (isWorn) entry.worn = true
        if (isCompanion) entry.wornCompanion = true
        locations.push({
          locationKey,
          locationType,
          displayName,
          bagId,
          slotIndex: Number(slotIndexKey),
          stackCount: item.stackCount,
          lastScanned,
        })
      }
    }
  }

  for (const locations of locationsById.values()) {
    locations.sort(compareLocations)
  }

  return result
}
