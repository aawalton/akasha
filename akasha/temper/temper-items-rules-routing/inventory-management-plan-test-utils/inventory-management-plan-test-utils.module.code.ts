import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "@akasha/temper-items-core/inventory-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import { makeItem as makeItemBase } from "@akasha/temper-items-rules-core/inventory-rule-test-utils"
import type { CategoryRule, ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"

export const ESO_BAG_BACKPACK = 1

let NEXT_ITEM_ID = 1_000_000

export function makeItem(name: string, quality = 2): InventoryItemData {
  NEXT_ITEM_ID += 1
  return makeItemBase({
    itemId: NEXT_ITEM_ID,
    itemName: name,
    quality,
  })
}

export function makeAffected(
  item: InventoryItemData,
  locationKey: string,
  displayName: string,
  bagId = ESO_BAG_BACKPACK
): AffectedItem {
  return { item, locationKey, locationDisplayName: displayName, bagId, alreadyAtDestination: false }
}

export function makeLocation(
  displayName: string,
  bags: Record<number, Record<number, InventoryItemData>>,
  bagSizes?: Record<number, number>
): InventoryLocationData {
  const loc: InventoryLocationData = { bags, displayName, lastScanned: Date.now() }
  if (bagSizes) loc.bagSizes = bagSizes
  return loc
}

export function makeInventory(
  locations: Record<string, InventoryLocationData>,
  characters?: Record<string, { displayName: string }>
): InventoryDatabase {
  const currencies = characters
    ? {
        characters: Object.fromEntries(
          Object.entries(characters).map(([id, c]) => [
            id,
            { displayName: c.displayName, lastScanned: Date.now(), balances: {} },
          ])
        ),
      }
    : undefined
  return {
    locations,
    meta: { displayName: "Test", worldName: "NA", lastFullScan: Date.now() },
    currencies,
  }
}

export function makeRule(
  id: string,
  action: CategoryRule["action"],
  destination?: CategoryRule["destination"]
): CategoryRule {
  return { id, categoryId: "all", action, destination, active: true }
}

export function makeItemRule(
  id: string,
  itemId: number,
  itemName: string,
  action: ItemRule["action"],
  destination?: ItemRule["destination"]
): ItemRule {
  return { id, itemId, itemName, action, destination, active: true }
}
