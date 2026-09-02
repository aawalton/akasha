import {
  type CompiledOrderedRule,
  IMPLICIT_TERMINAL_COMPILED_RULE,
} from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type {
  AffectedItem,
  AllRuleAffectedItemsResult,
  ClassifiedInventoryItem,
} from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import {
  IMPLICIT_TERMINAL_RULE_ID,
  type ItemRule,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { computeStockGroups } from "@akasha/temper-items-rules-eval/compute-stock-groups"
import { evaluateRule } from "@akasha/temper-items-rules-eval/evaluator"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import {
  computeQuantity,
  createAllocationEnv,
  type MatchedCI,
} from "../inventory-rule-matcher-allocators/inventory-rule-matcher-allocators.module.code.ts"
import {
  type AllRuleAffectedItemsCache,
  categoryRuleFingerprint,
  type RuleSnapshot,
  residueEntriesEqual,
  residuesFromPrevSnapshot,
  residuesToEntries,
  restoreResiduesFromEntries,
} from "../inventory-rule-matcher-cache/inventory-rule-matcher-cache.module.code.ts"
import {
  buildAffectedItem,
  getExcludeLocation,
  isAlreadyAtDestination,
  isContainerBlockedByAction,
} from "../inventory-rule-matcher-exclude/inventory-rule-matcher-exclude.module.code.ts"
import {
  applyFillOnceCI,
  applyFillOnceCompanionCI,
} from "../inventory-rule-matcher-fill-once/inventory-rule-matcher-fill-once.module.code.ts"
import {
  buildItemIdToCooldownGroup,
  buildWebEvalEnv,
} from "../web-eval-env/web-eval-env.module.code.ts"
import { webItemFactsFromClassified } from "../web-item-facts/web-item-facts.module.code.ts"

function ruleResultKey(rule: CompiledOrderedRule, idx: number): string {
  return rule.id ?? `rule#${idx}`
}

export function computeAllRuleAffectedItems(
  userRules: readonly CompiledOrderedRule[],
  classifiedItems: readonly ClassifiedInventoryItem[],
  context?: RuleMatcherContext,
  itemRules?: readonly ItemRule[],
  cache?: AllRuleAffectedItemsCache
): AllRuleAffectedItemsResult {
  const rules: CompiledOrderedRule[] = [
    ...userRules.filter((r) => r.id !== IMPLICIT_TERMINAL_RULE_ID),
    IMPLICIT_TERMINAL_COMPILED_RULE,
  ]
  const usableCache =
    cache !== undefined &&
    cache.classifiedItems === classifiedItems &&
    cache.matcherContext === context &&
    cache.itemRules === itemRules &&
    cache.lastResult !== null
      ? cache
      : undefined

  const residues = new Map<ClassifiedInventoryItem, number>()
  const { tryAllocation, beginStockRuleGroup, resetClaims } = createAllocationEnv(context)

  const result = new Map<string, readonly AffectedItem[]>()

  const evalEnv = buildWebEvalEnv(context, {
    itemIdToCooldownGroup: buildItemIdToCooldownGroup(classifiedItems),
  })
  const evalCtx = { env: evalEnv, claimedByCharacter: undefined } as const
  const itemFactsByCI = new Map<ClassifiedInventoryItem, ItemFacts>()
  const factsFor = (ci: ClassifiedInventoryItem): ItemFacts => {
    const cached = itemFactsByCI.get(ci)
    if (cached !== undefined) return cached
    const built = webItemFactsFromClassified(ci, context)
    itemFactsByCI.set(ci, built)
    return built
  }

  function residueOf(ci: ClassifiedInventoryItem): number {
    const v = residues.get(ci)
    return v === undefined ? ci.item.stackCount : v
  }

  if (itemRules) {
    for (const rule of itemRules) {
      const excludeLocation = getExcludeLocation(rule)
      const matched: MatchedCI[] = []
      const atDestination: ClassifiedInventoryItem[] = []

      beginStockRuleGroup(rule, new Set([rule.itemId]))

      for (const ci of classifiedItems) {
        const remaining = residueOf(ci)
        if (remaining === 0) continue
        if (ci.item.itemId !== rule.itemId) continue
        if (isContainerBlockedByAction(ci.item, rule.action)) continue
        if (excludeLocation && isAlreadyAtDestination(ci, excludeLocation)) {
          atDestination.push(ci)
          continue
        }
        const { consumed, allocation } = tryAllocation(ci, rule, remaining)
        if (consumed === 0) continue
        matched.push({ ci, consumed, allocation })
        if (rule.active !== false) {
          residues.set(ci, remaining - consumed)
        }
      }

      result.set(rule.id, [
        ...matched.map((m) => buildAffectedItem(m.ci, false, computeQuantity(m), m.allocation)),
        ...atDestination.map((ci) => buildAffectedItem(ci, true)),
      ])

      if (rule.active !== false) {
        for (const ci of atDestination) residues.set(ci, 0)
      }
    }
  }

  let replayFrom = 0
  if (usableCache !== undefined) {
    const currentResidues = residuesToEntries(residues, classifiedItems)
    const prevResiduesAfterItemRules = usableCache.residuesAfterItemRules
    if (residueEntriesEqual(currentResidues, prevResiduesAfterItemRules)) {
      replayFrom = rules.length
      for (const [i, rule] of rules.entries()) {
        const fp = categoryRuleFingerprint(rule)
        const snapshot = usableCache.snapshots[i]
        if (snapshot === undefined || snapshot.fingerprint !== fp) {
          replayFrom = i
          break
        }
      }
    }
  }

  if (replayFrom === rules.length && usableCache !== undefined && usableCache.lastResult) {
    return usableCache.lastResult
  }

  if (replayFrom > 0 && usableCache !== undefined) {
    const replaySnapshot = usableCache.snapshots[replayFrom]
    const prevResidues =
      replaySnapshot !== undefined
        ? replaySnapshot.residuesBefore
        : usableCache.snapshots.length > 0
          ? residuesFromPrevSnapshot(usableCache.snapshots, replayFrom - 1)
          : []
    restoreResiduesFromEntries(residues, classifiedItems, prevResidues)

    for (let i = 0; i < replayFrom; i++) {
      const rule = rules[i]
      const snapshot = usableCache.snapshots[i]
      if (rule === undefined || snapshot === undefined) continue
      result.set(ruleResultKey(rule, i), snapshot.affected)
    }

    resetClaims()
  }
  const nextSnapshots: RuleSnapshot[] =
    cache && replayFrom > 0 && usableCache !== undefined
      ? [...cache.snapshots.slice(0, replayFrom)]
      : []

  const residuesAfterItemRules = residuesToEntries(residues, classifiedItems)

  const stockGroupByRuleId = computeStockGroups(rules, classifiedItems, factsFor, evalEnv)
  const evalCtxWithGroups = { ...evalCtx, stockGroupByRuleId }

  for (let ruleIdx = replayFrom; ruleIdx < rules.length; ruleIdx++) {
    const rule = rules[ruleIdx]
    if (rule === undefined) continue

    const residuesBefore = cache ? residuesToEntries(residues, classifiedItems) : []

    const excludeLocation = getExcludeLocation(rule)
    const matched: MatchedCI[] = []
    const atDestination: ClassifiedInventoryItem[] = []

    const candidates: ClassifiedInventoryItem[] = []
    const matchedItemIds = new Set<number>()
    for (const ci of classifiedItems) {
      const remaining = residueOf(ci)
      if (remaining === 0) continue
      const verdict = evaluateRule(rule, ruleIdx, factsFor(ci), evalCtxWithGroups).verdict
      if (verdict.kind !== "matched") continue
      if (excludeLocation && isAlreadyAtDestination(ci, excludeLocation)) {
        atDestination.push(ci)
        continue
      }
      candidates.push(ci)
      matchedItemIds.add(ci.item.itemId)
    }

    beginStockRuleGroup(rule, matchedItemIds)

    for (const ci of candidates) {
      const remaining = residueOf(ci)
      if (remaining === 0) continue
      const { consumed, allocation } = tryAllocation(ci, rule, remaining)
      if (consumed === 0) continue
      matched.push({ ci, consumed, allocation })
    }

    let included: MatchedCI[]
    let preFilledCIs: readonly ClassifiedInventoryItem[] = []

    if (context && matched.length > 0 && rule.isTargetEquip === "is-target-equip") {
      const justCIs = matched.map((m) => m.ci)
      const { included: fillIncluded, preFilled } = applyFillOnceCI(
        justCIs,
        context.wantedEquipment
      )
      const includedSet = new Set(fillIncluded)
      included = matched.filter((m) => includedSet.has(m.ci))
      preFilledCIs = preFilled
    } else if (
      context &&
      matched.length > 0 &&
      rule.isTargetCompanionEquip === "is-target-companion-equip"
    ) {
      const justCIs = matched.map((m) => m.ci)
      const { included: fillIncluded, preFilled } = applyFillOnceCompanionCI(
        justCIs,
        context.wantedCompanionEquipment
      )
      const includedSet = new Set(fillIncluded)
      included = matched.filter((m) => includedSet.has(m.ci))
      preFilledCIs = preFilled
    } else {
      included = matched
    }

    const affected = [
      ...included.map((m) => buildAffectedItem(m.ci, false, computeQuantity(m), m.allocation)),
      ...atDestination.map((ci) => buildAffectedItem(ci, true)),
    ]

    result.set(ruleResultKey(rule, ruleIdx), affected)

    if (cache) {
      nextSnapshots[ruleIdx] = {
        fingerprint: categoryRuleFingerprint(rule),
        residuesBefore,
        affected,
      }
    }

    if (rule.active !== false) {
      for (const m of included) {
        const remaining = residueOf(m.ci)
        residues.set(m.ci, Math.max(0, remaining - m.consumed))
      }
      for (const ci of preFilledCIs) residues.set(ci, 0)
      for (const ci of atDestination) residues.set(ci, 0)
    }
  }

  const finalResult = { ruleMap: result }

  if (cache) {
    cache.classifiedItems = classifiedItems
    cache.matcherContext = context
    cache.itemRules = itemRules
    cache.residuesAfterItemRules = residuesAfterItemRules
    cache.snapshots = nextSnapshots.slice(0, rules.length)
    cache.lastResult = finalResult
  }

  return finalResult
}
