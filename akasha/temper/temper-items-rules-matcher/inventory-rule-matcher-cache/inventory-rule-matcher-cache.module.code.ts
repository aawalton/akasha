import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type {
  AffectedItem,
  AllRuleAffectedItemsResult,
  ClassifiedInventoryItem,
} from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"

export type ResidueEntries = readonly (readonly [number, number])[]

export interface RuleSnapshot {
  fingerprint: string
  residuesBefore: ResidueEntries
  affected: readonly AffectedItem[]
}

export interface AllRuleAffectedItemsCache {
  classifiedItems: readonly ClassifiedInventoryItem[] | null
  matcherContext: RuleMatcherContext | undefined
  snapshots: readonly RuleSnapshot[]
  itemRules: readonly ItemRule[] | undefined
  residuesAfterItemRules: ResidueEntries
  lastResult: AllRuleAffectedItemsResult | null
}

export function createAllRuleAffectedItemsCache(): AllRuleAffectedItemsCache {
  return {
    classifiedItems: null,
    matcherContext: undefined,
    snapshots: [],
    itemRules: undefined,
    residuesAfterItemRules: [],
    lastResult: null,
  }
}

export function categoryRuleFingerprint(rule: CompiledOrderedRule): string {
  return JSON.stringify(rule)
}

export function residuesToEntries(
  residues: Map<ClassifiedInventoryItem, number>,
  classifiedItems: readonly ClassifiedInventoryItem[]
): ResidueEntries {
  if (residues.size === 0) return []
  const entries: [number, number][] = []
  for (const [i, ci] of classifiedItems.entries()) {
    const res = residues.get(ci)
    if (res === undefined) continue
    if (res === ci.item.stackCount) continue
    entries.push([i, res])
  }
  return entries
}

export function restoreResiduesFromEntries(
  residues: Map<ClassifiedInventoryItem, number>,
  classifiedItems: readonly ClassifiedInventoryItem[],
  entries: ResidueEntries
): undefined {
  residues.clear()
  for (const [idx, residue] of entries) {
    const ci = classifiedItems[idx]
    if (ci) residues.set(ci, residue)
  }
}

export function residueEntriesEqual(a: ResidueEntries, b: ResidueEntries): boolean {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    const ea = a[i]
    const eb = b[i]
    if (ea === undefined || eb === undefined) return false
    if (ea[0] !== eb[0] || ea[1] !== eb[1]) return false
  }
  return true
}

export function residuesFromPrevSnapshot(
  snapshots: readonly RuleSnapshot[],
  snapshotIdx: number
): ResidueEntries {
  const next = snapshots[snapshotIdx + 1]
  if (next) return next.residuesBefore
  const current = snapshots[snapshotIdx]
  if (current === undefined) return []
  return current.residuesBefore
}
