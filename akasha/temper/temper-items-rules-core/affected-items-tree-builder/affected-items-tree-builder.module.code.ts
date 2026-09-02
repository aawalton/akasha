import { classifyItem } from "@akasha/temper-items-core/classify-item"
import { ESO_BAG_WORN } from "@akasha/temper-items-core/eso-bag-constants"
import { computeValue } from "@akasha/temper-items-core/inventory-display-value"
import {
  INVENTORY_TYPE_CATEGORY_ORDER,
  type InventoryTypeEntry,
} from "@akasha/temper-items-core/inventory-grouping-types"
import type { InventoryNode } from "@akasha/temper-items-core/inventory-node-types"
import { buildInventoryTypeNodes } from "@akasha/temper-items-core/inventory-type-tree-builder"
import { classifyLocation } from "@akasha/temper-items-core/location-classify"
import { type LocationTypeId, locationTypes } from "@akasha/temper-items-core/location-type-data"
import { requireFirst } from "@akasha/utils-narrow/require-first"
import type { AffectedItem } from "../inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"

function toTypeEntry(affected: AffectedItem, index: number): InventoryTypeEntry {
  const { item, locationKey } = affected
  return {
    row: {
      key: `${locationKey}-${item.itemId}-${index}`,
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
      stolen: item.stolen,
      bound: item.bound,
      replacementValue: item.replacementCost,
      merchantValue: item.merchantValue,
      saleAvg: item.saleAvg,
      minPrice: item.minPrice,
      amountCount: item.amountCount,
      saleAmountCount: item.saleAmountCount,
    },
    path: classifyItem(item),
  }
}

function buildTypeBranchesFromEntries(
  entries: readonly InventoryTypeEntry[]
): readonly InventoryNode[] {
  const byCategory = new Map<string, InventoryTypeEntry[]>()
  for (const entry of entries) {
    const l0 = entry.path[0]
    if (l0 == null) continue
    let list = byCategory.get(l0)
    if (!list) {
      list = []
      byCategory.set(l0, list)
    }
    list.push(entry)
  }

  const nodes: InventoryNode[] = []
  for (const category of INVENTORY_TYPE_CATEGORY_ORDER) {
    const categoryEntries = byCategory.get(category)
    if (!categoryEntries || categoryEntries.length === 0) continue
    const children = buildInventoryTypeNodes(categoryEntries, category)
    if (children.length === 0) continue
    nodes.push({ key: category.toLowerCase(), label: category, children })
  }
  return nodes
}

export function buildAffectedItemNodes(items: readonly AffectedItem[]): readonly InventoryNode[] {
  const entries = items.map(toTypeEntry)
  return buildTypeBranchesFromEntries(entries)
}

interface LocationGroup {
  locationKey: string
  displayName: string
  locationType: LocationTypeId
  items: readonly { affected: AffectedItem; index: number }[]
}

export function buildAffectedItemLocationNodes(
  items: readonly AffectedItem[]
): readonly InventoryNode[] {
  const accumulator = new Map<string, { affected: AffectedItem; index: number }[]>()
  const locationMap = new Map<string, LocationGroup>()
  for (const [i, affected] of items.entries()) {
    let bucket = accumulator.get(affected.locationKey)
    if (!bucket) {
      bucket = []
      accumulator.set(affected.locationKey, bucket)
      locationMap.set(affected.locationKey, {
        locationKey: affected.locationKey,
        displayName: affected.locationDisplayName,
        locationType: classifyLocation(affected.locationKey),
        items: bucket,
      })
    }
    bucket.push({ affected, index: i })
  }

  const typeMap = new Map<LocationTypeId, LocationGroup[]>()
  for (const group of locationMap.values()) {
    let list = typeMap.get(group.locationType)
    if (!list) {
      list = []
      typeMap.set(group.locationType, list)
    }
    list.push(group)
  }

  const nodes: InventoryNode[] = []
  for (const locationType of locationTypes.ids) {
    const groups = typeMap.get(locationType)
    if (!groups || groups.length === 0) continue

    groups.sort((a, b) => a.displayName.localeCompare(b.displayName))

    const isSingleton = groups.length === 1 && locationType !== "guild"

    if (isSingleton) {
      const group = requireFirst(groups, "groups")
      const locationChildren = buildLocationGroupChildren(group)
      nodes.push({
        key: locationType,
        label: locationTypes.data[locationType].name,
        children: locationChildren,
      })
    } else {
      const locationNodes: InventoryNode[] = groups.map((group) => ({
        key: group.locationKey,
        label: group.displayName,
        children: buildLocationGroupChildren(group),
      }))
      nodes.push({
        key: locationType,
        label: locationTypes.data[locationType].name,
        children: locationNodes,
      })
    }
  }

  return nodes
}

function buildLocationGroupChildren(group: LocationGroup): readonly InventoryNode[] {
  const entries = group.items.map(({ affected, index }) => toTypeEntry(affected, index))

  if (group.locationType === "character") {
    const wornEntries: InventoryTypeEntry[] = []
    const backpackEntries: InventoryTypeEntry[] = []
    for (const [i, item] of group.items.entries()) {
      const entry = entries[i]
      if (entry === undefined) continue
      if (item.affected.bagId === ESO_BAG_WORN) wornEntries.push(entry)
      else backpackEntries.push(entry)
    }

    const branches: InventoryNode[] = []
    if (wornEntries.length > 0) {
      branches.push({
        key: "worn",
        label: "Worn",
        children: buildTypeBranchesFromEntries(wornEntries),
      })
    }
    if (backpackEntries.length > 0) {
      branches.push({
        key: "backpack",
        label: "Backpack",
        children: buildTypeBranchesFromEntries(backpackEntries),
      })
    }
    return branches.length > 0 ? branches : buildTypeBranchesFromEntries(entries)
  }

  if (group.locationType === "craftbag") {
    return buildInventoryTypeNodes(entries, "Crafting")
  }

  return buildTypeBranchesFromEntries(entries)
}
