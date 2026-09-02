import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { TierAllocation } from "@akasha/temper-items-rules-core/destination-chain-types"
import type { EligibilityResolvers } from "@akasha/temper-items-rules-core/eligibility-predicate-composer"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type {
  ItemRule,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { planStockDestinationsForChain } from "@akasha/temper-items-rules-core/stock-destination-planner"
import type { StockDestinationContext } from "@akasha/temper-items-rules-core/stock-destination-types"
import {
  type CharacterId,
  characterId,
} from "@akasha/temper-items-rules-core/use-destination-types"

export interface ChainExpansionRow {
  readonly entry: AffectedItem
  readonly destination: MoveToDestination
  readonly sourceSlotCount: number
  readonly directAct: boolean
}

function buildChainStockContext(context: RuleMatcherContext): StockDestinationContext {
  const readOne = (itemId: number, charId: CharacterId): number => {
    const charStock = context.consumableStock.get(itemId)
    if (charStock === undefined) return 0
    return charStock.get(charId) ?? 0
  }
  return {
    characterPriority: context.characterPriority.map((id) => characterId(id)),
    getStockOnChar: readOne,
    getStockOnCharForGroup: (itemIds, charId) => {
      let sum = 0
      for (const id of itemIds) sum += readOne(id, charId)
      return sum
    },
  }
}

function buildChainEligibilityResolvers(context: RuleMatcherContext): EligibilityResolvers {
  return {
    getCharacterSkillLineRanks: context.getCharacterSkillLineRanks,
    getCharacterCurseState: context.getCharacterCurseState,
    getCharacterCanLevelMorphs: context.getCharacterCanLevelMorphs,
  }
}

export function expandChainEntryIntoRows(
  rule: CompiledOrderedRule | ItemRule,
  entry: AffectedItem,
  sourceSlotCount: number,
  context: RuleMatcherContext,
  claims: Map<CharacterId, Set<string>>,
  group?: { itemIds: ReadonlySet<number>; allocatedPerChar: Map<CharacterId, number> }
): { rows: readonly ChainExpansionRow[]; residue: number } {
  const chain = rule.destinationChain
  if (chain === undefined || chain.length === 0) return { rows: [], residue: 0 }
  const stackCount = entry.quantity ?? entry.item.stackCount
  if (stackCount <= 0) return { rows: [], residue: 0 }
  const stockCtx = buildChainStockContext(context)
  const resolvers = buildChainEligibilityResolvers(context)
  const groupKey = group !== undefined ? `stock:rule:${rule.id}` : `stock:${entry.item.itemId}`
  const itemIds = group?.itemIds ?? new Set([entry.item.itemId])
  const tierAllocations = planStockDestinationsForChain(
    groupKey,
    itemIds,
    stackCount,
    chain,
    stockCtx,
    resolvers,
    claims,
    group?.allocatedPerChar
  )
  const rows = tierAllocations.map((tierAlloc, idx) =>
    buildChainRowForAllocation(entry, idx === 0 ? sourceSlotCount : 0, tierAlloc)
  )
  let allocated = 0
  for (const t of tierAllocations) allocated += t.count
  const residue = Math.max(0, stackCount - allocated)
  return { rows, residue }
}

export function threadResidueToNextRule(
  rules: readonly (CompiledOrderedRule | ItemRule)[],
  ruleIdx: number,
  residue: number,
  sourceEntry: AffectedItem,
  workingAffectedItemsMap: Map<string, AffectedItem[]>
): string | undefined {
  if (residue <= 0) return undefined
  for (let nextIdx = ruleIdx + 1; nextIdx < rules.length; nextIdx++) {
    const nextRule = rules[nextIdx]
    if (nextRule === undefined) continue
    if (nextRule.active === false) continue
    if (nextRule.id === undefined) continue
    const residueEntry: AffectedItem = {
      item: sourceEntry.item,
      locationKey: sourceEntry.locationKey,
      locationDisplayName: sourceEntry.locationDisplayName,
      bagId: sourceEntry.bagId,
      alreadyAtDestination: false,
      quantity: residue,
    }
    const bucket = workingAffectedItemsMap.get(nextRule.id)
    if (bucket !== undefined) bucket.push(residueEntry)
    else workingAffectedItemsMap.set(nextRule.id, [residueEntry])
    return nextRule.id
  }
  return undefined
}

export function processChainRule(
  args: {
    rule: CompiledOrderedRule | ItemRule
    ruleIdx: number
    rules: readonly (CompiledOrderedRule | ItemRule)[]
    merged: readonly { entry: AffectedItem; sourceSlotCount: number }[]
    context: RuleMatcherContext
    chainClaims: Map<CharacterId, Set<string>>
    workingAffectedItemsMap: Map<string, AffectedItem[]>
    chainResidueRecipients: Set<string>
  },
  emitRoute: (
    entry: AffectedItem,
    destination: MoveToDestination | undefined,
    sourceSlotCount: number,
    chainTierDirect: boolean
  ) => void
): undefined {
  const {
    rule,
    ruleIdx,
    rules,
    merged,
    context,
    chainClaims,
    workingAffectedItemsMap,
    chainResidueRecipients,
  } = args
  const groupItemIds = new Set<number>()
  for (const { entry } of merged) groupItemIds.add(entry.item.itemId)
  const group = { itemIds: groupItemIds, allocatedPerChar: new Map<CharacterId, number>() }
  for (const { entry, sourceSlotCount } of merged) {
    const expansion = expandChainEntryIntoRows(
      rule,
      entry,
      sourceSlotCount,
      context,
      chainClaims,
      group
    )
    for (const row of expansion.rows) {
      emitRoute(row.entry, row.destination, row.sourceSlotCount, row.directAct)
    }
    if (expansion.residue > 0) {
      const recipient = threadResidueToNextRule(
        rules,
        ruleIdx,
        expansion.residue,
        entry,
        workingAffectedItemsMap
      )
      if (recipient !== undefined) chainResidueRecipients.add(recipient)
    }
  }
  return undefined
}

function buildChainRowForAllocation(
  entry: AffectedItem,
  sourceSlotCount: number,
  tierAlloc: TierAllocation
): ChainExpansionRow {
  const isByPriority = tierAlloc.destination === "character:by-priority"
  const charId = tierAlloc.charId
  const useAllocation =
    charId !== undefined && isByPriority
      ? Array.from({ length: tierAlloc.count }, () => charId)
      : undefined
  const syntheticItem: InventoryItemData = entry.item
  const syntheticEntry: AffectedItem = {
    item: syntheticItem,
    locationKey: entry.locationKey,
    locationDisplayName: entry.locationDisplayName,
    bagId: entry.bagId,
    alreadyAtDestination: false,
    quantity: tierAlloc.count,
    useAllocation,
  }
  const directAct = !isByPriority
  return {
    entry: syntheticEntry,
    destination: tierAlloc.destination,
    sourceSlotCount,
    directAct,
  }
}
