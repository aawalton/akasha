import { buildCompiledCharacterPriority } from "akasha/temper/addon/pages/items/modules/inventory-character-priority/inventory-character-priority.module.code.ts"
import { buildGetCharacterCurseState } from "akasha/temper/addon/pages/items/modules/inventory-curse-state/inventory-curse-state.module.code.ts"
import { buildUnlockContext } from "akasha/temper/addon/pages/items/modules/inventory-rules-core-character-finders/inventory-rules-core-character-finders.module.code.ts"
import type { UseAllocation } from "akasha/temper/addon/pages/items/modules/inventory-rules-types/inventory-rules-types.module.code.ts"
import { buildGetCharacterSkillLineRanks } from "akasha/temper/addon/pages/items/modules/inventory-skill-line-ranks/inventory-skill-line-ranks.module.code.ts"
import { canCharacterLevelMorphs } from "akasha/temper/addon/pages/items/modules/inventory-skill-morphs-progress/inventory-skill-morphs-progress.module.code.ts"
import {
  type CharEligibilityConditions,
  composeCharEligibilityPredicate,
  type EligibilityResolvers,
} from "akasha/temper/items/rules/core/modules/eligibility-predicate-composer/eligibility-predicate-composer.module.code.ts"
import type { ResolvedEntry } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type {
  DestinationChain,
  ItemAction,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { planStockChainVisit } from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import { planUseDestinationsForStack } from "akasha/temper/items/rules/core/modules/use-destination-resolver/use-destination-resolver.module.code.ts"
import {
  type CharacterId,
  characterId,
  type ItemKey,
} from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"

const FLAT_STOCK_SURPLUS_SINK = "bank"

function computeUseAllocation(
  bagId: number,
  slotIndex: number,
  itemKey: ItemKey,
  itemLink: string,
  claims: Map<CharacterId, Set<string>>
): { useAllocation: UseAllocation; destination: string | undefined } | undefined {
  const [stackCount] = GetSlotStackSize(bagId, slotIndex)
  if (stackCount <= 0) return undefined

  const currentCharStr = tostring(GetCurrentCharacterId())
  const currentChar = characterId(currentCharStr)
  const priority = buildCompiledCharacterPriority(currentChar)

  const ctx = buildUnlockContext(priority, currentChar, itemLink)
  const allocations = planUseDestinationsForStack(itemKey, stackCount, ctx, claims)
  if (allocations.length === 0) return undefined

  let currentCharQty = 0
  const otherCharDeposits: { charId: string; qty: number }[] = []
  for (const charId of allocations) {
    if (tostring(charId) === currentCharStr) {
      currentCharQty = 1
    } else {
      otherCharDeposits.push({ charId: tostring(charId), qty: 1 })
    }
  }

  let destination: string | undefined
  if (currentCharQty > 0) {
    destination = `character:${currentCharStr}`
  } else if (otherCharDeposits.length > 0) {
    const firstDeposit = otherCharDeposits[0]
    if (firstDeposit !== undefined) destination = `character:${firstDeposit.charId}`
  }

  return {
    useAllocation: { currentCharQty, otherCharDeposits },
    destination,
  }
}

function hasEligibilityGate(conditions: CharEligibilityConditions | undefined): boolean {
  if (conditions === undefined) return false
  return (
    (conditions.requiredSkillLines !== undefined &&
      conditions.requiredSkillLines.skillLineIds.length > 0) ||
    conditions.requiredCurseState !== undefined ||
    conditions.canLevelMorphs !== undefined
  )
}

function eligibilityResolversFor(conditions: CharEligibilityConditions): EligibilityResolvers {
  return {
    getCharacterSkillLineRanks:
      conditions.requiredSkillLines !== undefined
        ? buildGetCharacterSkillLineRanks()
        : () => undefined,
    getCharacterCurseState:
      conditions.requiredCurseState !== undefined ? buildGetCharacterCurseState() : () => undefined,
    getCharacterCanLevelMorphs: canCharacterLevelMorphs,
  }
}

function currentCharPassesEligibility(conditions: CharEligibilityConditions | undefined): boolean {
  if (conditions === undefined || !hasEligibilityGate(conditions)) return true
  const currentChar = characterId(tostring(GetCurrentCharacterId()))
  return composeCharEligibilityPredicate(
    conditions,
    eligibilityResolversFor(conditions)
  )(currentChar)
}

export function countEligibleCharacters(conditions: CharEligibilityConditions | undefined): number {
  const currentChar = characterId(tostring(GetCurrentCharacterId()))
  const priority = buildCompiledCharacterPriority(currentChar)
  if (conditions === undefined || !hasEligibilityGate(conditions)) return priority.length
  const passes = composeCharEligibilityPredicate(conditions, eligibilityResolversFor(conditions))
  let count = 0
  for (const one of priority) {
    if (passes(one)) count++
  }
  return count
}

function resolveStockChainForCurrentChar(
  chain: DestinationChain
): { destination: string | undefined; targetQuantity: number } | undefined {
  const plan = planStockChainVisit(chain)
  if (plan === undefined) return undefined

  const eligible = currentCharPassesEligibility(plan.charEligibility)
  return {
    destination: plan.surplusDestination,
    targetQuantity: eligible ? plan.fillTargetQuantity : 0,
  }
}

export function resolveFlatStockByPriority(rule: {
  targetQuantity?: number
  requiredSkillLines?: CharEligibilityConditions["requiredSkillLines"]
  requiredCurseState?: CharEligibilityConditions["requiredCurseState"]
  canLevelMorphs?: CharEligibilityConditions["canLevelMorphs"]
}): { destination: string; targetQuantity: number } {
  const eligible = currentCharPassesEligibility({
    requiredSkillLines: rule.requiredSkillLines,
    requiredCurseState: rule.requiredCurseState,
    canLevelMorphs: rule.canLevelMorphs,
  })
  return {
    destination: FLAT_STOCK_SURPLUS_SINK,
    targetQuantity: eligible ? (rule.targetQuantity ?? 0) : 0,
  }
}

export interface ResolveEntryAllocationCtx {
  bagId: number
  slotIndex: number
  itemKey: ItemKey | undefined
  itemLink: string
  claims: Map<CharacterId, Set<string>> | undefined
}

export function resolveEntryAllocation(
  entry: ResolvedEntry,
  action: ItemAction,
  resolvedDestination: string | undefined,
  ctx: ResolveEntryAllocationCtx
): {
  destination: string | undefined
  targetQuantity: number | undefined
  useAllocation: UseAllocation | undefined
} {
  let useAllocation: UseAllocation | undefined
  let destination = resolvedDestination
  let chainTargetQuantity: number | undefined
  if (
    action === "use" &&
    ctx.itemKey !== undefined &&
    ctx.itemKey.kind !== "consumable" &&
    entry.destination === "character:by-priority" &&
    ctx.claims !== undefined
  ) {
    const allocation = computeUseAllocation(
      ctx.bagId,
      ctx.slotIndex,
      ctx.itemKey,
      ctx.itemLink,
      ctx.claims
    )
    if (allocation !== undefined) {
      useAllocation = allocation.useAllocation
      destination = allocation.destination ?? destination
    }
  } else if (
    action === "stock" &&
    entry.action === "stock" &&
    entry.destinationChain !== undefined &&
    entry.destinationChain.length > 0
  ) {
    const chainResolution = resolveStockChainForCurrentChar(entry.destinationChain)
    if (chainResolution !== undefined) {
      chainTargetQuantity = chainResolution.targetQuantity
      if (chainResolution.destination !== undefined) {
        destination = chainResolution.destination
      }
    }
  } else if (
    action === "stock" &&
    entry.action === "stock" &&
    entry.destination === "character:by-priority"
  ) {
    const flat = resolveFlatStockByPriority(entry)
    chainTargetQuantity = flat.targetQuantity
    destination = flat.destination
  }

  return {
    destination,
    targetQuantity:
      entry.action === "stock" ? (chainTargetQuantity ?? entry.targetQuantity) : undefined,
    useAllocation,
  }
}
