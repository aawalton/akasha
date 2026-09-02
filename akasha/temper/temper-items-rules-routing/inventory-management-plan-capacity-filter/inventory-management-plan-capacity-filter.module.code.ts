import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { getLocationDisplayName } from "@akasha/temper-items-core/location-classify"
import { narrowDestination } from "@akasha/temper-items-rules-core/inventory-destination-parse"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import { resolveStorageKey } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route-helpers"
import { getActionVenue } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route-venue"
import {
  buildExistingStorageItems,
  buildStorageFreeSlots,
  isItemStackable,
} from "../inventory-management-plan-capacity/inventory-management-plan-capacity.module.code.ts"

export interface CapacityAuditDroppedItem {
  readonly itemName: string
  readonly units: number
}

export interface CapacityAuditDroppedRule {
  readonly ruleId: string
  readonly ruleTitle: string | null
  readonly action: "move-to" | "stock"
  readonly droppedStacks: number
  readonly droppedUnits: number
  readonly items: readonly CapacityAuditDroppedItem[]
}

export interface CapacityAuditEntry {
  readonly storageKey: string
  readonly destinationName: string
  readonly freeSlots: number
  readonly neededSlots: number
  readonly droppedStacks: number
  readonly droppedUnits: number
  readonly rules: readonly CapacityAuditDroppedRule[]
}

export interface CapacityAudit {
  readonly entries: readonly CapacityAuditEntry[]
}

export interface CapacityFilterResult {
  readonly filteredMap: Map<string, readonly AffectedItem[]>
  readonly audit: CapacityAudit
}

function unitsOf(item: AffectedItem): number {
  return item.quantity ?? item.item.stackCount
}

export function applyDestinationCapacityFilterWithAudit(
  rules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  affectedItemsMap: Map<string, readonly AffectedItem[]>,
  inventory: InventoryDatabase | null
): CapacityFilterResult {
  const storageFreeSlots = buildStorageFreeSlots(inventory)
  const existingStorageItems = buildExistingStorageItems(inventory)

  const result = new Map<string, AffectedItem[]>()
  for (const [key, items] of affectedItemsMap) {
    result.set(key, [...items])
  }

  const capacityBudget = new Map<string, number>()
  for (const [key, free] of storageFreeSlots) {
    capacityBudget.set(key, free)
  }

  const claimedStackableItems = new Map<string, Set<number>>()
  for (const [key, itemIds] of existingStorageItems) {
    claimedStackableItems.set(key, new Set(itemIds))
  }

  const neededByKey = new Map<string, number>()
  const auditRulesByKey = new Map<string, CapacityAuditDroppedRule[]>()
  const droppedStacksByKey = new Map<string, number>()
  const droppedUnitsByKey = new Map<string, number>()

  const orderedRules: Array<ItemRule | CompiledOrderedRule> = []
  for (const rule of itemRules) {
    orderedRules.push(rule)
  }
  for (const rule of rules) {
    orderedRules.push(rule)
  }

  for (let ruleIdx = 0; ruleIdx < orderedRules.length; ruleIdx++) {
    const rule = orderedRules[ruleIdx]
    if (rule === undefined) continue
    if (rule.active === false) continue
    if (rule.action !== "move-to" && rule.action !== "stock") continue
    if (rule.id === undefined) continue

    const destination =
      rule.destination === undefined ? undefined : narrowDestination(rule.destination)
    const venue = getActionVenue(rule.action, destination, false)
    const storageKey = resolveStorageKey(venue, destination, inventory)
    if (storageKey === undefined) continue

    let budget = capacityBudget.get(storageKey)
    if (budget === undefined) {
      budget = 0
      capacityBudget.set(storageKey, budget)
    }

    const affected = result.get(rule.id)
    if (!affected) continue

    const atDestination: AffectedItem[] = []
    const actionable: AffectedItem[] = []
    for (const item of affected) {
      if (item.alreadyAtDestination) {
        atDestination.push(item)
      } else {
        actionable.push(item)
      }
    }

    const fits: AffectedItem[] = []
    const excess: AffectedItem[] = []

    for (const item of actionable) {
      const stackable = isItemStackable(item.item)
      let consumesSlot: boolean

      if (stackable) {
        const existingSet = claimedStackableItems.get(storageKey)
        if (existingSet?.has(item.item.itemId)) {
          consumesSlot = false
        } else {
          consumesSlot = true
        }
      } else {
        consumesSlot = true
      }

      if (consumesSlot) {
        neededByKey.set(storageKey, (neededByKey.get(storageKey) ?? 0) + 1)
      }

      if (!consumesSlot || budget > 0) {
        fits.push(item)
        if (consumesSlot) {
          budget--
        }
        if (stackable) {
          let claimedSet = claimedStackableItems.get(storageKey)
          if (!claimedSet) {
            claimedSet = new Set()
            claimedStackableItems.set(storageKey, claimedSet)
          }
          claimedSet.add(item.item.itemId)
        }
      } else {
        excess.push(item)
      }
    }

    capacityBudget.set(storageKey, budget)

    result.set(rule.id, [...fits, ...atDestination])

    if (excess.length > 0) {
      const unitsByName = new Map<string, number>()
      let droppedUnits = 0
      for (const item of excess) {
        const units = unitsOf(item)
        droppedUnits += units
        unitsByName.set(item.item.itemName, (unitsByName.get(item.item.itemName) ?? 0) + units)
      }
      const items: CapacityAuditDroppedItem[] = []
      for (const [itemName, units] of unitsByName) {
        items.push({ itemName, units })
      }
      const ruleReport: CapacityAuditDroppedRule = {
        ruleId: rule.id,
        ruleTitle: null,
        action: rule.action,
        droppedStacks: excess.length,
        droppedUnits,
        items,
      }
      let rulesForKey = auditRulesByKey.get(storageKey)
      if (!rulesForKey) {
        rulesForKey = []
        auditRulesByKey.set(storageKey, rulesForKey)
      }
      rulesForKey.push(ruleReport)
      droppedStacksByKey.set(
        storageKey,
        (droppedStacksByKey.get(storageKey) ?? 0) + ruleReport.droppedStacks
      )
      droppedUnitsByKey.set(
        storageKey,
        (droppedUnitsByKey.get(storageKey) ?? 0) + ruleReport.droppedUnits
      )
    }

    if (excess.length > 0) {
      const excessSet = new Set(excess)
      for (let laterIdx = ruleIdx + 1; laterIdx < orderedRules.length; laterIdx++) {
        const laterRule = orderedRules[laterIdx]
        if (laterRule === undefined) continue
        if (laterRule.id === undefined) continue
        const laterItems = result.get(laterRule.id)
        if (!laterItems) continue
        const filtered = laterItems.filter((laterItem) => {
          for (const ex of excessSet) {
            if (laterItem.item === ex.item && laterItem.locationKey === ex.locationKey) {
              return false
            }
          }
          return true
        })
        if (filtered.length !== laterItems.length) {
          result.set(laterRule.id, filtered)
        }
      }
    }
  }

  const entries: CapacityAuditEntry[] = []
  for (const [storageKey, rules] of auditRulesByKey) {
    const storedName = inventory?.locations[storageKey]?.displayName ?? storageKey
    entries.push({
      storageKey,
      destinationName: getLocationDisplayName(storageKey, storedName),
      freeSlots: storageFreeSlots.get(storageKey) ?? 0,
      neededSlots: neededByKey.get(storageKey) ?? 0,
      droppedStacks: droppedStacksByKey.get(storageKey) ?? 0,
      droppedUnits: droppedUnitsByKey.get(storageKey) ?? 0,
      rules,
    })
  }

  return { filteredMap: result, audit: { entries } }
}

export function applyDestinationCapacityFilter(
  rules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  affectedItemsMap: Map<string, readonly AffectedItem[]>,
  inventory: InventoryDatabase | null
): Map<string, readonly AffectedItem[]> {
  return applyDestinationCapacityFilterWithAudit(rules, itemRules, affectedItemsMap, inventory)
    .filteredMap
}
