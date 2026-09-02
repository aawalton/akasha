import { LOC_HOUSE_BANK_PREFIX } from "../inventory-constants/inventory-constants.module.code.ts"
import { getDatabase } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type { LocationData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
import { slotKey } from "../inventory-slot-key/inventory-slot-key.module.code.ts"
export interface BankSlotContext {
  reserved: LuaMap<number, true>
  vacated: LuaMap<number, true>
  isBank: boolean
  isHouseStorage: boolean
  bankingBag: number
  currentChestId: string | undefined
}

export function bankFindEmptySlot(ctx: BankSlotContext, bag: number): number | undefined {
  const size = GetBagSize(bag)
  for (let slot = 0; slot < size; slot++) {
    const key = slotKey(bag, slot)
    if (ctx.reserved.has(key)) continue
    const [stackCount] = GetSlotStackSize(bag, slot)
    if (stackCount === 0 || ctx.vacated.has(key)) {
      ctx.reserved.set(key, true)
      return slot
    }
  }
  return undefined
}

export function bankFindEmptyBackpackSlot(ctx: BankSlotContext): number | undefined {
  return bankFindEmptySlot(ctx, BAG_BACKPACK)
}

export function bankFindPartialStackSlot(
  ctx: BankSlotContext,
  bag: number,
  itemId: number
): number | undefined {
  const size = GetBagSize(bag)
  for (let slot = 0; slot < size; slot++) {
    const key = slotKey(bag, slot)
    if (ctx.reserved.has(key)) continue
    if (ctx.vacated.has(key)) continue
    const [stackCount, maxStack] = GetSlotStackSize(bag, slot)
    if (stackCount <= 0 || stackCount >= maxStack) continue
    const link = GetItemLink(bag, slot, LINK_STYLE_BRACKETS)
    if (GetItemLinkItemId(link) === itemId) {
      ctx.reserved.set(key, true)
      return slot
    }
  }
  return undefined
}

export function bankFindEmptyStorageSlot(
  ctx: BankSlotContext
): { bag: number; slot: number } | undefined {
  if (ctx.isBank) {
    const slot = bankFindEmptySlot(ctx, BAG_BANK)
    if (slot !== undefined) return { bag: BAG_BANK, slot }
    if (IsESOPlusSubscriber()) {
      const subSlot = bankFindEmptySlot(ctx, BAG_SUBSCRIBER_BANK)
      if (subSlot !== undefined) return { bag: BAG_SUBSCRIBER_BANK, slot: subSlot }
    }
    return undefined
  }
  const slot = bankFindEmptySlot(ctx, ctx.bankingBag)
  if (slot !== undefined) return { bag: ctx.bankingBag, slot }
  return undefined
}

export function bankFindPartialStorageSlot(
  ctx: BankSlotContext,
  itemId: number
): { bag: number; slot: number } | undefined {
  if (ctx.isBank) {
    const slot = bankFindPartialStackSlot(ctx, BAG_BANK, itemId)
    if (slot !== undefined) return { bag: BAG_BANK, slot }
    if (IsESOPlusSubscriber()) {
      const subSlot = bankFindPartialStackSlot(ctx, BAG_SUBSCRIBER_BANK, itemId)
      if (subSlot !== undefined) return { bag: BAG_SUBSCRIBER_BANK, slot: subSlot }
    }
    return undefined
  }
  const slot = bankFindPartialStackSlot(ctx, ctx.bankingBag, itemId)
  if (slot !== undefined) return { bag: ctx.bankingBag, slot }
  return undefined
}

export function bankIsCorrectStorage(ctx: BankSlotContext, dest: string): boolean {
  if (dest === "bank") return ctx.isBank
  if (dest === "furniture-vault") return false
  if (dest === "house-storage") return ctx.isHouseStorage
  if (dest.substring(0, 14) === "house-storage:") {
    if (!ctx.isHouseStorage) return false
    const chestId = dest.substring(14)
    return chestId === ctx.currentChestId
  }
  return false
}

export function bankCountInBag(bag: number, targetItemId: number, excludeStolen?: boolean): number {
  let count = 0
  const size = GetBagSize(bag)
  for (let slot = 0; slot < size; slot++) {
    const [stackSize] = GetSlotStackSize(bag, slot)
    if (stackSize === 0) continue
    if (excludeStolen && IsItemStolen(bag, slot)) continue
    const link = GetItemLink(bag, slot, LINK_STYLE_BRACKETS)
    if (GetItemLinkItemId(link) === targetItemId) count += stackSize
  }
  return count
}

export function bankCountItemInStorage(ctx: BankSlotContext, targetItemId: number): number {
  let total = 0
  if (ctx.isBank) {
    total += bankCountInBag(BAG_BANK, targetItemId)
    if (IsESOPlusSubscriber()) total += bankCountInBag(BAG_SUBSCRIBER_BANK, targetItemId)
  } else if (ctx.isHouseStorage) {
    total += bankCountInBag(ctx.bankingBag, targetItemId)
  }
  return total
}

export function estimateDestinationFreeSlots(dest: string): number | undefined {
  const db = getDatabase()

  if (dest.substring(0, 11) === "guild-bank:") {
    const guildName = dest.substring(11)
    const location = db.locations[guildName]
    if (location === undefined || !location.bagSizes) return undefined
    let capacity = 0
    let used = 0
    for (const [bagIdStr, bagSize] of Object.entries(location.bagSizes)) {
      const bagId = tonumber(bagIdStr)
      if (bagId === undefined) continue
      capacity += bagSize
      const bag = location.bags[bagId]
      if (bag !== undefined) used += Object.keys(bag).length
    }
    return capacity - used
  }

  if (dest.substring(0, 14) === "house-storage:") {
    const chestId = dest.substring(14)
    for (const [key, location] of Object.entries(db.locations)) {
      if (
        key.substring(0, LOC_HOUSE_BANK_PREFIX.length) === LOC_HOUSE_BANK_PREFIX &&
        key.substring(key.length - chestId.length - 1) === `:${chestId}`
      ) {
        if (!location.bagSizes) return undefined
        let capacity = 0
        let used = 0
        for (const [bagIdStr, bagSize] of Object.entries(location.bagSizes)) {
          const bagId = tonumber(bagIdStr)
          if (bagId === undefined) continue
          capacity += bagSize
          const bag = location.bags[bagId]
          if (bag !== undefined) used += Object.keys(bag).length
        }
        return capacity - used
      }
    }
    return undefined
  }

  if (dest === "house-storage") {
    let totalFree = 0
    let found = false
    for (const [key, location] of Object.entries(db.locations)) {
      if (key.substring(0, LOC_HOUSE_BANK_PREFIX.length) !== LOC_HOUSE_BANK_PREFIX) continue
      if (!location.bagSizes) continue
      found = true
      for (const [bagIdStr, bagSize] of Object.entries(location.bagSizes)) {
        const bagId = tonumber(bagIdStr)
        if (bagId === undefined) continue
        totalFree += bagSize
        const bag = location.bags[bagId]
        if (bag !== undefined) totalFree -= Object.keys(bag).length
      }
    }
    return found ? totalFree : undefined
  }

  if (dest === "guild-bank") {
    return undefined
  }

  return undefined
}

export function destinationHasStackableItem(dest: string, itemId: number): boolean {
  const db = getDatabase()

  function locationHasItem(location: LocationData): boolean {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        if (item.itemId === itemId && item.equipType == null) return true
      }
    }
    return false
  }

  if (dest.substring(0, 11) === "guild-bank:") {
    const guildName = dest.substring(11)
    const location = db.locations[guildName]
    return location !== undefined ? locationHasItem(location) : false
  }

  if (dest.substring(0, 14) === "house-storage:") {
    const chestId = dest.substring(14)
    for (const [key, location] of Object.entries(db.locations)) {
      if (
        key.substring(0, LOC_HOUSE_BANK_PREFIX.length) === LOC_HOUSE_BANK_PREFIX &&
        key.substring(key.length - chestId.length - 1) === `:${chestId}`
      ) {
        return locationHasItem(location)
      }
    }
    return false
  }

  if (dest === "house-storage") {
    for (const [key, location] of Object.entries(db.locations)) {
      if (key.substring(0, LOC_HOUSE_BANK_PREFIX.length) !== LOC_HOUSE_BANK_PREFIX) continue
      if (locationHasItem(location)) return true
    }
    return false
  }

  return false
}
