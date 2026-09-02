import {
  type ConsumableStack,
  needsRecharge,
  needsRepair,
  orderRepairKits,
  orderSoulGems,
} from "../inventory-auto-maintenance-select/inventory-auto-maintenance-select.module.code.ts"
import { getInventoryConfig } from "../inventory-config/inventory-config.module.code.ts"
export const WEAPON_SLOTS: readonly number[] = [
  EQUIP_SLOT_MAIN_HAND,
  EQUIP_SLOT_OFF_HAND,
  EQUIP_SLOT_BACKUP_MAIN,
  EQUIP_SLOT_BACKUP_OFF,
]
export const REPAIR_SLOTS: readonly number[] = [
  EQUIP_SLOT_HEAD,
  EQUIP_SLOT_CHEST,
  EQUIP_SLOT_SHOULDERS,
  EQUIP_SLOT_LEGS,
  EQUIP_SLOT_FEET,
  EQUIP_SLOT_HAND,
  EQUIP_SLOT_WAIST,
  EQUIP_SLOT_NECK,
  EQUIP_SLOT_RING1,
  EQUIP_SLOT_RING2,
  EQUIP_SLOT_MAIN_HAND,
  EQUIP_SLOT_OFF_HAND,
  EQUIP_SLOT_BACKUP_MAIN,
  EQUIP_SLOT_BACKUP_OFF,
]

const CHARGE_THRESHOLD = 0.1
const REPAIR_THRESHOLD = 0.1
const REPAIR_DELAY_MS = 500
export const DURABILITY_DEBOUNCE_MS = 100

const DEFAULT_USE_CROWN_SOULGEMS_FIRST = false
const DEFAULT_DONT_USE_CROWN_KITS = false
const DEFAULT_USE_CROWN_KITS_FIRST = false

const NO_CHARGE_CHANGE_SLOTS: Record<number, boolean> = {}
const NO_DURABILITY_CHANGE_SLOTS: Record<number, boolean> = {}

export function shouldSuppressChargeEvent(slotIndex: number): boolean {
  if (NO_CHARGE_CHANGE_SLOTS[slotIndex] === true) {
    delete NO_CHARGE_CHANGE_SLOTS[slotIndex]
    return true
  }
  return false
}

export function shouldSuppressDurabilityEvent(slotIndex: number): boolean {
  if (NO_DURABILITY_CHANGE_SLOTS[slotIndex] === true) {
    delete NO_DURABILITY_CHANGE_SLOTS[slotIndex]
    return true
  }
  return false
}

export function resetMaintenanceSuppression(): undefined {
  for (const slot of REPAIR_SLOTS) {
    NO_CHARGE_CHANGE_SLOTS[slot] = false
    NO_DURABILITY_CHANGE_SLOTS[slot] = false
  }
}

function resolveMaintenanceToggle(charId: string, key: "recharge" | "repair"): boolean {
  const automation = getInventoryConfig().automation
  const perChar = automation?.characters[charId]?.[key]
  if (typeof perChar === "boolean") return perChar
  return automation?.global?.characters?.[key] ?? false
}

function scanSoulGems(this: void): ConsumableStack[] {
  const gems: ConsumableStack[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (IsItemSoulGem(SOUL_GEM_TYPE_FILLED, BAG_BACKPACK, slot) === true) {
      const [stack] = GetSlotStackSize(BAG_BACKPACK, slot)
      if (stack > 0) {
        const [tier] = GetSoulGemItemInfo(BAG_BACKPACK, slot)
        gems.push({ bag: BAG_BACKPACK, index: slot, size: stack, tier, isCrown: tier === 0 })
      }
    }
  }
  return gems
}

function scanRepairKits(this: void): ConsumableStack[] {
  const kits: ConsumableStack[] = []
  const bagSize = GetBagSize(BAG_BACKPACK)
  for (let slot = 0; slot < bagSize; slot++) {
    if (
      IsItemRepairKit(BAG_BACKPACK, slot) === true &&
      IsItemNonGroupRepairKit(BAG_BACKPACK, slot) === true
    ) {
      const [stack] = GetSlotStackSize(BAG_BACKPACK, slot)
      if (stack > 0) {
        const isCrown = IsItemNonCrownRepairKit(BAG_BACKPACK, slot) === false
        kits.push({
          bag: BAG_BACKPACK,
          index: slot,
          size: stack,
          tier: GetRepairKitTier(BAG_BACKPACK, slot),
          isCrown,
        })
      }
    }
  }
  return kits
}

interface ConsumeOutcome {
  consumed: boolean
  stopAll: boolean
}

interface MaintenanceDescriptor {
  toggleKey: "recharge" | "repair"
  slots: readonly number[]
  interSlotDelayMs: number
  scan: (this: void) => ConsumableStack[]
  order: (this: void, stacks: ConsumableStack[]) => ConsumableStack[]
  needsMaintenance: (this: void, slot: number) => boolean
  consume: (this: void, slot: number, ordered: ConsumableStack[]) => ConsumeOutcome
}

export const RECHARGE_DESCRIPTOR: MaintenanceDescriptor = {
  toggleKey: "recharge",
  slots: WEAPON_SLOTS,
  interSlotDelayMs: 0,
  scan: scanSoulGems,
  order: (stacks) => orderSoulGems(stacks, DEFAULT_USE_CROWN_SOULGEMS_FIRST),
  needsMaintenance: (slot) => {
    if (!HasItemInSlot(BAG_WORN, slot)) return false
    const [charge, maxCharge] = GetChargeInfoForItem(BAG_WORN, slot)
    return needsRecharge(charge, maxCharge, CHARGE_THRESHOLD)
  },
  consume: (slot, ordered) => {
    const gem = ordered[ordered.length - 1]
    if (gem === undefined) return { consumed: false, stopAll: false }
    const amount = GetAmountSoulGemWouldChargeItem(BAG_WORN, slot, gem.bag, gem.index)
    if (amount <= 0) return { consumed: false, stopAll: false }
    NO_CHARGE_CHANGE_SLOTS[slot] = true
    ChargeItemWithSoulGem(BAG_WORN, slot, gem.bag, gem.index)
    gem.size = gem.size - 1
    if (gem.size < 1) ordered.pop()
    return { consumed: true, stopAll: false }
  },
}

export const REPAIR_DESCRIPTOR: MaintenanceDescriptor = {
  toggleKey: "repair",
  slots: REPAIR_SLOTS,
  interSlotDelayMs: REPAIR_DELAY_MS,
  scan: scanRepairKits,
  order: (stacks) =>
    orderRepairKits(stacks, {
      dontUseCrown: DEFAULT_DONT_USE_CROWN_KITS,
      useCrownFirst: DEFAULT_USE_CROWN_KITS_FIRST,
    }),
  needsMaintenance: (slot) => {
    if (!HasItemInSlot(BAG_WORN, slot)) return false
    if (!DoesItemHaveDurability(BAG_WORN, slot)) return false
    const [, slotHasItem] = GetEquippedItemInfo(slot)
    if (!slotHasItem) return false
    if (GetItemLink(BAG_WORN, slot, LINK_STYLE_DEFAULT) === "") return false
    return needsRepair(GetItemCondition(BAG_WORN, slot), REPAIR_THRESHOLD)
  },
  consume: (slot, ordered) => {
    const kit = ordered[ordered.length - 1]
    if (kit === undefined) return { consumed: false, stopAll: false }
    if (kit.isCrown) {
      const [usable, onlyFromActionSlot] = IsItemUsable(kit.bag, kit.index)
      if (!usable || onlyFromActionSlot) return { consumed: false, stopAll: false }
      NO_DURABILITY_CHANGE_SLOTS[slot] = true
      if (IsProtectedFunction("UseItem")) {
        CallSecureProtected("UseItem", kit.bag, kit.index)
      } else {
        UseItem(kit.bag, kit.index)
      }
      kit.size = kit.size - 1
      if (kit.size < 1) ordered.pop()
      return { consumed: true, stopAll: true }
    }
    const amount = GetAmountRepairKitWouldRepairItem(BAG_WORN, slot, kit.bag, kit.index)
    if (amount <= 0) return { consumed: false, stopAll: false }
    NO_DURABILITY_CHANGE_SLOTS[slot] = true
    RepairItemWithRepairKit(BAG_WORN, slot, kit.bag, kit.index)
    kit.size = kit.size - 1
    if (kit.size < 1) ordered.pop()
    return { consumed: true, stopAll: false }
  },
}

function processSlots(
  this: void,
  descriptor: MaintenanceDescriptor,
  ordered: ConsumableStack[],
  slots: readonly number[],
  index: number
): undefined {
  if (index >= slots.length) return
  if (ordered.length === 0) return
  if (IsUnitDead("player")) return
  const slot = slots[index]
  if (slot !== undefined && descriptor.needsMaintenance(slot)) {
    const outcome = descriptor.consume(slot, ordered)
    if (outcome.stopAll) return
  }
  const next = index + 1
  if (next >= slots.length) return
  if (descriptor.interSlotDelayMs > 0) {
    zo_callLater(() => processSlots(descriptor, ordered, slots, next), descriptor.interSlotDelayMs)
  } else {
    processSlots(descriptor, ordered, slots, next)
  }
}

export function runMaintenancePass(
  descriptor: MaintenanceDescriptor,
  slotIndex?: number
): undefined {
  const charId = tostring(GetCurrentCharacterId())
  if (!resolveMaintenanceToggle(charId, descriptor.toggleKey)) return
  if (IsUnitDead("player")) return
  const ordered = descriptor.order(descriptor.scan())
  if (ordered.length === 0) return
  const slots =
    slotIndex === undefined ? descriptor.slots : descriptor.slots.filter((s) => s === slotIndex)
  processSlots(descriptor, ordered, slots, 0)
}
