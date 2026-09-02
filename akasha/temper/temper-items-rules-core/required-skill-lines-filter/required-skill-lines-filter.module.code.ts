import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  RequiredSkillLinesCondition,
  RequiredSkillLinesMode,
} from "../required-skill-lines-filter-types/required-skill-lines-filter-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import type { RuleMatcherContext } from "../rule-matcher-context-types/rule-matcher-context-types.module.code.ts"

const read = (c: CategoryRule["conditions"]): RequiredSkillLinesCondition | undefined =>
  c?.requiredSkillLines && c.requiredSkillLines.skillLineIds.length > 0
    ? c.requiredSkillLines
    : undefined

export function characterPassesRequiredSkillLines(
  charId: string,
  condition: RequiredSkillLinesCondition,
  getCharacterSkillLineRanks: NonNullable<RuleMatcherContext["getCharacterSkillLineRanks"]>
): boolean {
  if (condition.skillLineIds.length === 0) return true
  return evaluateMode(condition.mode, charId, condition.skillLineIds, getCharacterSkillLineRanks)
}

function evaluateMode(
  mode: RequiredSkillLinesMode,
  charId: string,
  skillLineIds: readonly string[],
  resolve: NonNullable<RuleMatcherContext["getCharacterSkillLineRanks"]>
): boolean {
  if (mode === "all-maxed") {
    for (const id of skillLineIds) {
      const ranks = resolve(charId, id)
      if (ranks === undefined) return false
      if (ranks.currentRank < ranks.maxRank) return false
    }
    return true
  }
  for (const id of skillLineIds) {
    const ranks = resolve(charId, id)
    if (ranks === undefined) continue
    if (ranks.currentRank < ranks.maxRank) return true
  }
  return false
}

export const REQUIRED_SKILL_LINES_FILTER: InventoryRuleFilter = {
  id: "required-skill-lines",
  label: "Required Skill Lines",
  priority: 0,
  isEligible: () => true,
  isEligibleForAction: (action: ItemAction) => action === "stock",
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    const ids = [...v.skillLineIds].sort().join(",")
    return `${v.mode}:${ids}`
  },
  applyDefault: () => ({}),
  clear: () => ({ requiredSkillLines: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { requiredSkillLines: v } : {}
  },
}
