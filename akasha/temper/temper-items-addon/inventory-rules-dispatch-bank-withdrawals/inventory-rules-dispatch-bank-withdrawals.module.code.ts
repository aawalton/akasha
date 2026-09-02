import { isBackpackRequiredAction } from "@akasha/temper-items-rules-core/action-storage-capability"
import { planStockReconcile } from "@akasha/temper-items-rules-core/stock-reconcile-plan"
import { isConsolidateDest } from "@akasha/temper-items-rules-routing-core/inventory-consolidate-dest"
import { isObjectRecord } from "@akasha/utils-narrow/is-object-record"
import { getConfiguredBufferSlots } from "../inventory-backpack-buffer/inventory-backpack-buffer.module.code.ts"
import { ADDON_NAME } from "../inventory-constants/inventory-constants.module.code.ts"
import {
  clearPendingAction,
  forEachPendingAction,
  getCompiledConfig,
  getPendingAction,
  getPendingDestination,
  getPendingRuleIndex,
  getPendingStockScope,
  getPendingTargetQuantity,
} from "../inventory-rules-core/inventory-rules-core.module.code.ts"
import { isVendorCrossCharDestination } from "../inventory-rules-cross-char/inventory-rules-cross-char.module.code.ts"
import {
  type FrozenStockCounts,
  frozenStockCount,
} from "../inventory-rules-dispatch-bank-reconcile/inventory-rules-dispatch-bank-reconcile.module.code.ts"
import {
  type BankSlotContext,
  bankFindEmptyBackpackSlot,
  bankFindPartialStackSlot,
  bankIsCorrectStorage,
  destinationHasStackableItem,
  estimateDestinationFreeSlots,
} from "../inventory-rules-dispatch-bank-slots/inventory-rules-dispatch-bank-slots.module.code.ts"
import {
  evaluateRules,
  findMatchedRule,
} from "../inventory-rules-eval/inventory-rules-eval.module.code.ts"
import { slotKey } from "../inventory-slot-key/inventory-slot-key.module.code.ts"
import { getTemperCharactersData } from "../inventory-temper-characters-data/inventory-temper-characters-data.module.code.ts"
export const BANK_CHARACTER_PREFIX = "character:"

export function canCurrentCharacterBenefitFromXP(): boolean {
  if (GetPlayerChampionPointsEarned() < 3600) return true

  if (GetUnitLevel("player") < 50) return true

  const characters = getTemperCharactersData()
  if (!characters) return true

  const currentId = tostring(GetCurrentCharacterId())
  const charData = characters[currentId]
  if (!isObjectRecord(charData)) return true

  const skillLineProgress = charData["skillLineProgress"]
  if (!isObjectRecord(skillLineProgress)) return true

  for (const slEntry of Object.values(skillLineProgress)) {
    if (!isObjectRecord(slEntry)) continue
    const skills = slEntry["skills"]
    if (!isObjectRecord(skills)) continue
    for (const skillEntry of Object.values(skills)) {
      if (!isObjectRecord(skillEntry)) continue
      for (const morphKey of ["base", "morph1", "morph2"] as const) {
        const morphData = skillEntry[morphKey]
        if (!isObjectRecord(morphData)) continue
        const rank = morphData["rank"]
        if (typeof rank === "number" && rank < 4) return true
      }
    }
  }

  return false
}

export function collectBankWithdrawals(
  ctx: BankSlotContext,
  currentCharId: string,
  frozen: FrozenStockCounts
): { bagId: number; slotIndex: number; dest: string; ruleIndex: number }[] {
  const withdrawals: { bagId: number; slotIndex: number; dest: string; ruleIndex: number }[] = []

  function collectBackpackRequired(this: void, bag: number, slot: number): undefined {
    const matched = findMatchedRule(bag, slot)
    if (matched !== undefined && isBackpackRequiredAction(matched.action, matched.destination)) {
      if (isVendorCrossCharDestination(matched.destination)) return
      withdrawals.push({
        bagId: bag,
        slotIndex: slot,
        dest: "backpack",
        ruleIndex: matched.ruleIndex,
      })
    }
  }

  if (ctx.isBank) {
    const bankSize = GetBagSize(BAG_BANK)
    for (let slot = 0; slot < bankSize; slot++) {
      evaluateRules(BAG_BANK, slot)
      collectBackpackRequired(BAG_BANK, slot)
    }
    if (IsESOPlusSubscriber()) {
      const subBankSize = GetBagSize(BAG_SUBSCRIBER_BANK)
      for (let slot = 0; slot < subBankSize; slot++) {
        evaluateRules(BAG_SUBSCRIBER_BANK, slot)
        collectBackpackRequired(BAG_SUBSCRIBER_BANK, slot)
      }
    }
  } else if (ctx.isHouseStorage) {
    const storageSize = GetBagSize(ctx.bankingBag)
    for (let slot = 0; slot < storageSize; slot++) {
      evaluateRules(ctx.bankingBag, slot)
      collectBackpackRequired(ctx.bankingBag, slot)
    }
  }

  forEachPendingAction(function (this: void, bagId, slotIndex, action, destination): undefined {
    if (bagId === BAG_BACKPACK) return
    const isMoveLike =
      action === "move-to" ||
      action === "stock" ||
      action === "character-equip" ||
      action === "companion-equip"
    const isCharacterUse =
      action === "use" &&
      destination !== undefined &&
      destination.substring(0, BANK_CHARACTER_PREFIX.length) === BANK_CHARACTER_PREFIX
    const isCharacterResearch =
      action === "research" &&
      destination !== undefined &&
      destination.substring(0, BANK_CHARACTER_PREFIX.length) === BANK_CHARACTER_PREFIX
    const isCharacterDeconstruct =
      action === "deconstruct" &&
      destination !== undefined &&
      destination.substring(0, BANK_CHARACTER_PREFIX.length) === BANK_CHARACTER_PREFIX
    if (!isMoveLike && !isCharacterUse && !isCharacterResearch && !isCharacterDeconstruct) {
      clearPendingAction(bagId, slotIndex)
      return
    }
    const dest = destination ?? "bank"

    if (action === "stock" && bankIsCorrectStorage(ctx, dest)) {
      const scope = getPendingStockScope(bagId, slotIndex)
      if (scope === "any-character") {
        const tq = getPendingTargetQuantity(bagId, slotIndex) ?? 0
        const itemLink = GetItemLink(bagId, slotIndex, LINK_STYLE_BRACKETS)

        const [, specializedType] = GetItemLinkItemType(itemLink)
        if (specializedType === 105) {
          if (!canCurrentCharacterBenefitFromXP()) {
            clearPendingAction(bagId, slotIndex)
            return
          }
        }

        const pendingRuleIndex = getPendingRuleIndex(bagId, slotIndex)
        const backpackCount = frozenStockCount(
          frozen,
          pendingRuleIndex,
          GetItemLinkItemId(itemLink)
        )
        if (backpackCount < tq) {
          withdrawals.push({
            bagId,
            slotIndex,
            dest,
            ruleIndex: pendingRuleIndex ?? 999999,
          })
          return
        }
      }
      clearPendingAction(bagId, slotIndex)
      return
    }

    if (bankIsCorrectStorage(ctx, dest)) {
      clearPendingAction(bagId, slotIndex)
      return
    }

    if (ctx.isBank && dest.substring(0, BANK_CHARACTER_PREFIX.length) === BANK_CHARACTER_PREFIX) {
      const charId = dest.substring(BANK_CHARACTER_PREFIX.length)
      if (charId !== currentCharId) {
        clearPendingAction(bagId, slotIndex)
        return
      }
    }

    if (ctx.isBank && action === "character-equip" && destination != null) {
      const charId = destination.slice("character-worn:".length)
      if (charId !== currentCharId) {
        clearPendingAction(bagId, slotIndex)
        return
      }
    }

    if (ctx.isBank && isConsolidateDest(dest)) {
      const compiled = getCompiledConfig()
      const primary = compiled?.characterPriority?.[0]
      if (primary !== undefined && currentCharId !== primary) {
        clearPendingAction(bagId, slotIndex)
        return
      }
    }

    withdrawals.push({
      bagId,
      slotIndex,
      dest,
      ruleIndex: getPendingRuleIndex(bagId, slotIndex) ?? 999999,
    })
  })

  table.sort(withdrawals, function (this: void, a, b): boolean {
    if (a.ruleIndex !== b.ruleIndex) return a.ruleIndex < b.ruleIndex
    const aSlot = a.bagId * 100000 + a.slotIndex
    const bSlot = b.bagId * 100000 + b.slotIndex
    return aSlot < bSlot
  })

  const destBudgets = new LuaMap<string, number>()
  const destStackableClaimed = new LuaMap<string, LuaMap<number, true>>()
  const capped: typeof withdrawals = []

  for (const w of withdrawals) {
    if (!isConsolidateDest(w.dest)) {
      capped.push(w)
      continue
    }

    let budget = destBudgets.get(w.dest)
    if (budget === undefined) {
      const free = estimateDestinationFreeSlots(w.dest)
      budget = free ?? 999999
      destBudgets.set(w.dest, budget)
    }

    const itemLink = GetItemLink(w.bagId, w.slotIndex, LINK_STYLE_BRACKETS)
    const itemId = GetItemLinkItemId(itemLink)
    const isStackable = GetItemLinkEquipType(itemLink) === 0

    let consumesSlot = true
    if (isStackable) {
      let claimed = destStackableClaimed.get(w.dest)
      if (!claimed) {
        claimed = new LuaMap<number, true>()
        destStackableClaimed.set(w.dest, claimed)
      }
      if (claimed.has(itemId) || destinationHasStackableItem(w.dest, itemId)) {
        consumesSlot = false
      }
      claimed.set(itemId, true)
    }

    if (!consumesSlot) {
      capped.push(w)
      continue
    }

    if (budget > 0) {
      destBudgets.set(w.dest, budget - 1)
      capped.push(w)
    } else {
      clearPendingAction(w.bagId, w.slotIndex)
    }
  }

  return capped
}

export function executeBankWithdrawals(
  ctx: BankSlotContext,
  currentCharId: string,
  frozen: FrozenStockCounts,
  maxOps: number,
  bankMoveItem: (
    sourceBag: number,
    sourceSlot: number,
    targetBag: number,
    targetSlot: number,
    stackCount: number
  ) => void
): { ops: number; withdrawnLinks: string[] } {
  const withdrawals = collectBankWithdrawals(ctx, currentCharId, frozen)
  const withdrawnLinks: string[] = []

  const stockWithdrawnCounts = new LuaMap<number, number>()

  const bufferSlots = getConfiguredBufferSlots()
  const initialFree = GetNumBagFreeSlots(BAG_BACKPACK)

  let ops = 0

  for (const w of withdrawals) {
    if (ops >= maxOps) break
    if (initialFree - ops <= bufferSlots) {
      d(`[${ADDON_NAME}] Stopping withdrawals — backpack buffer reached (${bufferSlots} reserved)`)
      break
    }
    const [stackCount] = GetSlotStackSize(w.bagId, w.slotIndex)
    if (stackCount === 0) continue

    let toWithdraw = stackCount
    const withdrawAction = getPendingAction(w.bagId, w.slotIndex)
    if (withdrawAction === "stock") {
      const scope = getPendingStockScope(w.bagId, w.slotIndex)
      if (scope === "any-character") {
        const tq = getPendingTargetQuantity(w.bagId, w.slotIndex) ?? 0
        const itemLink = GetItemLink(w.bagId, w.slotIndex, LINK_STYLE_BRACKETS)
        const itemId = GetItemLinkItemId(itemLink)
        const ruleIndex = getPendingRuleIndex(w.bagId, w.slotIndex)
        const accumKey = ruleIndex ?? itemId
        const alreadyWithdrawn = stockWithdrawnCounts.get(accumKey) ?? 0
        const backpackCount = frozenStockCount(frozen, ruleIndex, itemId) + alreadyWithdrawn
        const plan = planStockReconcile({
          selfTarget: tq,
          backpackCount,
          openTierCap: undefined,
          openTierStorageCount: 0,
          withdrawableFromOpen: stackCount,
        })
        toWithdraw = plan.direction === "withdraw" ? plan.count : 0
        if (toWithdraw === 0) {
          clearPendingAction(w.bagId, w.slotIndex)
          continue
        }
        stockWithdrawnCounts.set(accumKey, alreadyWithdrawn + toWithdraw)
      }
    } else if (withdrawAction === "use") {
      const dest = getPendingDestination(w.bagId, w.slotIndex)
      if (
        dest !== undefined &&
        dest.substring(0, BANK_CHARACTER_PREFIX.length) === BANK_CHARACTER_PREFIX
      ) {
        toWithdraw = math.min(stackCount, 1)
      }
    }

    const itemLink = GetItemLink(w.bagId, w.slotIndex, LINK_STYLE_BRACKETS)
    const withdrawItemId = GetItemLinkItemId(itemLink)
    const partialBackpackSlot = bankFindPartialStackSlot(ctx, BAG_BACKPACK, withdrawItemId)
    if (partialBackpackSlot !== undefined) {
      ctx.reserved.delete(slotKey(BAG_BACKPACK, partialBackpackSlot))
    }
    const targetSlot = partialBackpackSlot ?? bankFindEmptyBackpackSlot(ctx)
    if (targetSlot === undefined) {
      d(`[${ADDON_NAME}] Backpack is full, stopping withdraw`)
      break
    }
    withdrawnLinks.push(toWithdraw > 1 ? `${itemLink} x${toWithdraw}` : itemLink)
    bankMoveItem(w.bagId, w.slotIndex, BAG_BACKPACK, targetSlot, toWithdraw)
    if (toWithdraw === stackCount) {
      ctx.vacated.set(slotKey(w.bagId, w.slotIndex), true)
    }
    clearPendingAction(w.bagId, w.slotIndex)
    ops++
  }

  return { ops, withdrawnLinks }
}
