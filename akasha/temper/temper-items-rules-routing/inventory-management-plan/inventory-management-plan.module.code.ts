import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { resolveCharacterName } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route-helpers"
import type {
  CharacterSession,
  ManagementPlan,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import { requireGet } from "@akasha/utils-narrow/require-get"
import {
  BUY_CHARACTER_ID,
  BUY_CHARACTER_NAME,
  injectBuySimSteps,
} from "../inventory-management-plan-buy/inventory-management-plan-buy.module.code.ts"
import {
  buildStorageFreeSlots,
  getBackpackFreeSlots,
} from "../inventory-management-plan-capacity/inventory-management-plan-capacity.module.code.ts"
import { collectSimSteps } from "../inventory-management-plan-collect/inventory-management-plan-collect.module.code.ts"
import { sumTotalValues } from "../inventory-management-plan-grouping/inventory-management-plan-grouping.module.code.ts"
import {
  type CharSimState,
  simulateCharacterSession,
} from "../inventory-management-plan-simulation/inventory-management-plan-simulation.module.code.ts"

function keyLess(a: readonly number[], b: readonly number[]): boolean {
  for (let i = 0; i < a.length; i++) {
    const av = a[i] ?? 0
    const bv = b[i] ?? 0
    if (av !== bv) return av < bv
  }
  return false
}

export function buildManagementPlan(
  rules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  affectedItemsMap: Map<string, readonly AffectedItem[]> | null,
  inventory: InventoryDatabase | null,
  context?: RuleMatcherContext,
  bufferSlots?: number,
  buyRules?: readonly BuyRule[]
): ManagementPlan {
  const empty: ManagementPlan = {
    sessions: [],
    totalCharacterSwitches: 0,
    totalVenueVisits: 0,
    totalSlots: 0,
  }

  if (!affectedItemsMap) return empty

  const charStates = collectSimSteps(rules, itemRules, affectedItemsMap, inventory, context)
  injectBuySimSteps(charStates, buyRules, inventory)
  if (charStates.size === 0) return empty

  const sessions: CharacterSession[] = []
  const visitCounts = new Map<string, number>()
  const storageFreeSlots = buildStorageFreeSlots(inventory)

  const rosterIndex = new Map<string, number>()
  if (context) {
    for (const [i, id] of context.characterPriority.entries()) rosterIndex.set(id, i)
  }

  const allDepositKeys = new Map<string, Set<string>>()
  for (const [charId, state] of charStates) {
    if (state.depositKeys.size > 0) {
      allDepositKeys.set(charId, state.depositKeys)
    }
  }

  function countUnmetRetrievalDeps(charId: string): number {
    const state = charStates.get(charId)
    if (!state) return 0
    let count = 0
    const seen = new Set<string>()
    for (const step of state.pending) {
      if (step.operation !== "retrieve" || step.storageKey === undefined) continue
      const key = `${step.storageKey}:${step.itemId}`
      if (seen.has(key)) continue
      seen.add(key)
      for (const [depositorId, depositKeys] of allDepositKeys) {
        if (depositorId === charId) continue
        if (!depositKeys.has(key)) continue
        const depositorState = charStates.get(depositorId)
        if (!depositorState) continue
        const stillHasPendingDeposit = depositorState.pending.some(
          (s) =>
            s.operation === "deposit" &&
            s.storageKey !== undefined &&
            `${s.storageKey}:${s.itemId}` === key
        )
        if (stillHasPendingDeposit) {
          count++
          break
        }
      }
    }
    return count
  }

  function selectionKey(charId: string, state: CharSimState): readonly number[] {
    const isFillDestination = state.pending.some((s) => s.operation === "retrieve")
    const idx = rosterIndex.get(charId)
    let rosterKey = 0
    if (idx !== undefined) rosterKey = isFillDestination ? idx : -idx
    return [
      countUnmetRetrievalDeps(charId),
      isFillDestination ? 1 : 0,
      rosterKey,
      -state.pending.length,
    ]
  }

  const skipped = new Set<string>()

  const maxRounds = 100
  let rounds = 0

  while (rounds < maxRounds) {
    let bestCharId: string | null = null
    let bestKey: readonly number[] | null = null

    for (const [charId, state] of charStates) {
      if (state.pending.length === 0) continue
      if (skipped.has(charId)) continue
      const key = selectionKey(charId, state)
      if (bestKey === null || keyLess(key, bestKey)) {
        bestCharId = charId
        bestKey = key
      }
    }

    if (bestCharId == null) break

    const state = requireGet(charStates, bestCharId, "charStates")
    const pendingBefore = state.pending.length
    const freeSlots = getBackpackFreeSlots(bestCharId, inventory, bufferSlots)

    const result = simulateCharacterSession(state, freeSlots, storageFreeSlots)

    if (result.venues.length === 0) {
      skipped.add(bestCharId)
      continue
    }

    skipped.clear()

    const visit = (visitCounts.get(bestCharId) ?? 0) + 1
    visitCounts.set(bestCharId, visit)

    let totalSlots = 0
    for (const venue of result.venues) totalSlots += venue.slotCount

    sessions.push({
      characterId: bestCharId,
      characterName:
        bestCharId === BUY_CHARACTER_ID
          ? BUY_CHARACTER_NAME
          : resolveCharacterName(bestCharId, inventory),
      venues: result.venues,
      totalSlots,
      visitNumber: visit,
      totalValue: sumTotalValues(result.venues.map((v) => v.totalValue)),
    })

    if (state.pending.length >= pendingBefore) {
      skipped.add(bestCharId)
    }

    if (state.pending.length === 0) {
      charStates.delete(bestCharId)
    }

    rounds++
  }

  let totalSlots = 0
  let totalVenueVisits = 0
  for (const session of sessions) {
    totalSlots += session.totalSlots
    totalVenueVisits += session.venues.length
  }

  return {
    sessions,
    totalCharacterSwitches: Math.max(0, sessions.length - 1),
    totalVenueVisits,
    totalSlots,
    totalValue: sumTotalValues(sessions.map((s) => s.totalValue)),
  }
}
