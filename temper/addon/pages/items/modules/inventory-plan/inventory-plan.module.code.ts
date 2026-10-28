import { ADDON_NAME } from "akasha/temper/addon/pages/items/modules/inventory-constants/inventory-constants.module.code.ts"
import {
  getChestDisplayName,
  getLocationKeyForBag,
  liveStorageChests,
} from "akasha/temper/addon/pages/items/modules/inventory-location-keys/inventory-location-keys.module.code.ts"
import {
  chestGivesUp,
  classifyPendingVenue,
} from "akasha/temper/addon/pages/items/modules/inventory-plan-venue/inventory-plan-venue.module.code.ts"
import {
  forEachPendingAction,
  getCompiledConfig,
  getPendingAction,
  getPendingRuleIndex,
  getPendingTargetQuantity,
} from "akasha/temper/addon/pages/items/modules/inventory-rules-core/inventory-rules-core.module.code.ts"
import { listingHoldReason } from "akasha/temper/addon/pages/items/modules/inventory-rules-list/inventory-rules-list.module.code.ts"
import type { AddonItemAction } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import {
  getDatabase,
  isSavedVariablesReady,
} from "akasha/temper/addon/pages/items/modules/inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import { stockGroupKey } from "akasha/temper/addon/pages/items/modules/inventory-stock-group/inventory-stock-group.module.code.ts"
import { addToTally } from "akasha/temper/addon/pages/items/modules/inventory-tally/inventory-tally.module.code.ts"
import { venueTitleOf } from "akasha/temper/addon/pages/items/modules/inventory-venue-titles/inventory-venue-titles.module.code.ts"
import {
  chestIdOfHouseBankKey,
  chestMatchProblem,
  houseStorageTarget,
  matchStorageChest,
} from "akasha/temper/items/rules/core/modules/house-storage-chest/house-storage-chest.module.code.ts"
import { storageCarrierOf } from "akasha/temper/items/rules/routing/core/modules/inventory-consolidate-dest/inventory-consolidate-dest.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
type StaticVenueKey =
  | "bank"
  | "house-storage"
  | "furniture-vault"
  | "guild-bank"
  | "crafting-station"
  | "vendor"
  | "fence"
  | "guild-store"
  | "companion-menu"
  | "mailbox"
  | "backpack"

const VENUE_ORDER: StaticVenueKey[] = [
  "bank",
  "house-storage",
  "furniture-vault",
  "guild-bank",
  "crafting-station",
  "vendor",
  "fence",
  "guild-store",
  "companion-menu",
  "mailbox",
  "backpack",
]

function isStaticVenueKey(value: string): value is StaticVenueKey {
  return VENUE_ORDER.some((one) => one === value)
}

export function resolveVenueLabel(venueKey: string): string {
  if (isStaticVenueKey(venueKey)) {
    return venueTitleOf(venueKey)
  }
  const chest = houseStorageTarget(venueKey)
  if (chest !== undefined) {
    const match = matchStorageChest(chest, liveStorageChests())
    const problem = chestMatchProblem(chest, match)
    if (problem !== undefined) return `${venueTitleOf("house-storage")} (${problem})`
    const collectibleId = match.kind === "one" ? tonumber(match.chestId) : undefined
    return collectibleId === undefined ? chest : getChestDisplayName(collectibleId)
  }
  return venueKey
}

interface PlannedSlot {
  bagId: number
  slotIndex: number
  verb: string
  destination?: string
}

interface VenuePlan {
  venue: string
  label?: string
  verbs: Array<{ verb: string; count: number }>
  held: Array<{ reason: string; count: number }>
  slots: PlannedSlot[]
  items?: PlanItem[]
}

const HOUSE_CHEST_VENUE = "house-chest:"

function labelOf(entry: VenuePlan): string {
  return entry.label ?? resolveVenueLabel(entry.venue)
}

function backpackStockGroup(slot: number): number {
  const itemId = GetItemLinkItemId(GetItemLink(BAG_BACKPACK, slot, LINK_STYLE_BRACKETS))
  return stockGroupKey(getPendingRuleIndex(BAG_BACKPACK, slot), itemId)
}

function backpackStockTotals(bagSize: number): LuaMap<number, number> {
  const totals = new LuaMap<number, number>()
  for (let slot = 0; slot < bagSize; slot++) {
    if (getPendingAction(BAG_BACKPACK, slot) !== "stock") continue
    if (IsItemStolen(BAG_BACKPACK, slot)) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    const key = backpackStockGroup(slot)
    totals.set(key, (totals.get(key) ?? 0) + stackCount)
  }
  return totals
}

function isStockWithinTarget(
  bagId: number,
  slotIndex: number,
  totals: LuaMap<number, number>
): boolean {
  if (bagId !== BAG_BACKPACK) return false
  const target = getPendingTargetQuantity(bagId, slotIndex)
  if (target === undefined) return false
  return (totals.get(backpackStockGroup(slotIndex)) ?? 0) <= target
}

function computePlanVenues(): VenuePlan[] | undefined {
  const compiled = getCompiledConfig()
  if (!compiled) return undefined

  const venueCounts = new LuaMap<string, Record<string, number>>()
  const venueSlots = new LuaMap<string, PlannedSlot[]>()
  const dynamicHouseKeys: string[] = []

  function noteSlot(venue: string, slot: PlannedSlot): undefined {
    const slots = venueSlots.get(venue)
    if (slots === undefined) {
      venueSlots.set(venue, [slot])
    } else {
      slots.push(slot)
    }
  }

  function touch(venue: string): Record<string, number> {
    let counts = venueCounts.get(venue)
    if (counts === undefined) {
      counts = {}
      venueCounts.set(venue, counts)
      if (venue.startsWith("house-storage:")) {
        dynamicHouseKeys.push(venue)
      }
    }
    return counts
  }

  const venueHeld = new LuaMap<string, Record<string, number>>()

  function touchHeld(venue: string): Record<string, number> {
    let held = venueHeld.get(venue)
    if (held === undefined) {
      held = {}
      venueHeld.set(venue, held)
    }
    return held
  }

  const stockTotals = backpackStockTotals(GetBagSize(BAG_BACKPACK))
  const currentCharId = tostring(GetCurrentCharacterId())

  forEachPendingAction(function (
    this: void,
    bagId: number,
    slotIndex: number,
    action: AddonItemAction,
    destination?: string
  ): undefined {
    if (action === "stock" && isStockWithinTarget(bagId, slotIndex, stockTotals)) return
    const classified = classifyPendingVenue(
      action,
      destination,
      IsItemStolen(bagId, slotIndex),
      function (this: void): boolean {
        return HasCraftBagAccess() && CanItemBeVirtual(bagId, slotIndex)
      },
      currentCharId,
      function (this: void): string | undefined {
        return listingHoldReason(bagId, slotIndex)
      },
      bagId === BAG_BACKPACK
    )
    if (classified === undefined) return
    if (classified.held !== undefined) {
      addToTally(touchHeld(classified.venue), classified.held, 1)
      return
    }
    addToTally(touch(classified.venue), classified.verb, 1)
    noteSlot(classified.venue, { bagId, slotIndex, verb: classified.verb, destination })
  })

  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (!IsItemJunk(BAG_BACKPACK, slot)) continue
    if (getPendingAction(BAG_BACKPACK, slot) !== undefined) continue
    const [stackCount] = GetSlotStackSize(BAG_BACKPACK, slot)
    if (stackCount === 0) continue
    const junkVenue = IsItemStolen(BAG_BACKPACK, slot) ? "fence" : "vendor"
    addToTally(touch(junkVenue), "sell", 1)
    noteSlot(junkVenue, { bagId: BAG_BACKPACK, slotIndex: slot, verb: "sell" })
  }

  const chestVenues: string[] = []
  const chestLabels = new LuaMap<string, string>()
  const chestItems = new LuaMap<string, PlanItem[]>()
  const carriesStorage = currentCharId === storageCarrierOf(compiled.characterPriority)
  const openKey = IsBankOpen() ? getLocationKeyForBag(GetBankingBag()) : undefined
  for (const [key, location] of Object.entries(getDatabase().locations)) {
    const chestId = chestIdOfHouseBankKey(key)
    if (chestId === undefined || key === openKey) continue
    const chest = { chestId, name: location.displayName }
    const venue = `${HOUSE_CHEST_VENUE}${key}`
    for (const [bagSaid, slots] of Object.entries(location.bags)) {
      for (const [slotSaid, item] of Object.entries(slots)) {
        const { resolvedAction, resolvedDestination } = item
        if (!chestGivesUp(resolvedAction, resolvedDestination, chest, carriesStorage)) continue
        let items = chestItems.get(venue)
        if (items === undefined) {
          items = []
          chestItems.set(venue, items)
          chestLabels.set(venue, location.displayName)
          chestVenues.push(venue)
        }
        addToTally(touch(venue), "withdraw", 1)
        items.push({
          bagId: tonumber(bagSaid) ?? 0,
          slotIndex: tonumber(slotSaid) ?? 0,
          link: item.itemLink,
          count: item.stackCount,
          verb: "withdraw",
          destination: resolvedDestination,
        })
      }
    }
  }

  const result: VenuePlan[] = []

  function pushVenue(venueKey: string): undefined {
    const counts = venueCounts.get(venueKey)
    const heldCounts = venueHeld.get(venueKey)
    if (counts === undefined && heldCounts === undefined) return
    const verbs: Array<{ verb: string; count: number }> = []
    for (const [verb, count] of Object.entries(counts ?? {})) {
      verbs.push({ verb, count })
    }
    const held: Array<{ reason: string; count: number }> = []
    for (const [reason, count] of Object.entries(heldCounts ?? {})) {
      held.push({ reason, count })
    }
    result.push({
      venue: venueKey,
      label: chestLabels.get(venueKey),
      verbs,
      held,
      slots: venueSlots.get(venueKey) ?? [],
      items: chestItems.get(venueKey),
    })
  }

  for (const staticKey of VENUE_ORDER) {
    pushVenue(staticKey)
    if (staticKey === "house-storage") {
      for (const dynamicKey of dynamicHouseKeys) {
        pushVenue(dynamicKey)
      }
      for (const chestKey of chestVenues) {
        pushVenue(chestKey)
      }
    }
  }

  return result
}

interface PlanItem {
  bagId: number
  slotIndex: number
  link: string
  count: number
  verb: string
  destination?: string
}

interface PlanVenue {
  label: string
  count: number
  line: string
  items: PlanItem[]
}

function planItems(slots: readonly PlannedSlot[]): PlanItem[] {
  return slots.map((slot): PlanItem => {
    const [count] = GetSlotStackSize(slot.bagId, slot.slotIndex)
    return { ...slot, link: GetItemLink(slot.bagId, slot.slotIndex), count }
  })
}

interface InventoryActionSummary {
  totalSlots: number
  venues: PlanVenue[]
}

export function stacksSaid(count: number): string {
  return `${count} ${count === 1 ? "stack" : "stacks"}`
}

export function getInventoryActionSummary(): InventoryActionSummary | undefined {
  if (!isSavedVariablesReady()) return undefined
  const plan = computePlanVenues()
  if (!plan) return undefined

  let totalSlots = 0
  const venues: Array<{ label: string; count: number; items: PlanItem[] }> = []
  for (const entry of plan) {
    if (entry.venue === "crafting-station" || entry.venue === "backpack") {
      for (const v of entry.verbs) {
        totalSlots += v.count
        const items = planItems(entry.slots.filter((slot) => slot.verb === v.verb))
        const label =
          v.verb === "deconstruct"
            ? "Deconstruct"
            : v.verb === "refine"
              ? "Refine"
              : v.verb === "fillet"
                ? "Fillet"
                : v.verb === "research"
                  ? "Research"
                  : v.verb === "fill"
                    ? "Fill"
                    : resolveVenueLabel(entry.venue)
        venues.push({ label, count: v.count, items })
      }
    } else if (entry.verbs.length > 0) {
      let venueCount = 0
      for (const v of entry.verbs) {
        venueCount += v.count
      }
      totalSlots += venueCount
      venues.push({
        label: labelOf(entry),
        count: venueCount,
        items: entry.items ?? planItems(entry.slots),
      })
    }
  }

  table.sort(venues, function (this: void, a, b): boolean {
    return a.count > b.count
  })

  const lines: PlanVenue[] = venues.map((v) => ({
    ...v,
    line: `${v.label} — ${stacksSaid(v.count)}`,
  }))
  for (const entry of plan) {
    for (const h of entry.held) {
      const label = labelOf(entry)
      lines.push({
        label,
        count: h.count,
        items: [],
        line: `${label} — ${h.count} held: ${h.reason}`,
      })
    }
  }

  return { totalSlots, venues: lines }
}

export function handleTemperPlanCommand(): undefined {
  const compiled = getCompiledConfig()
  if (!compiled) {
    d(`[${ADDON_NAME}] Plan: No rules compiled — sync from Temper web`)
    return
  }

  const plan = computePlanVenues()
  if (!plan || plan.length === 0) {
    d(`[${ADDON_NAME}] Plan: No actions pending`)
    return
  }

  d(`[${ADDON_NAME}] Plan:`)
  for (const entry of plan) {
    const label = labelOf(entry)
    const parts: string[] = []
    for (const v of entry.verbs) {
      parts.push(`${v.verb} ${v.count}`)
    }
    for (const h of entry.held) {
      parts.push(`held ${h.count} (${h.reason})`)
    }
    d(`  ${label} \u2014 ${parts.join(", ")}`)
  }
}
