import { characterPassesCanLevelMorphs } from "../can-level-morphs-filter/can-level-morphs-filter.module.code.ts"
import type { CanLevelMorphsCondition } from "../can-level-morphs-filter-types/can-level-morphs-filter-types.module.code.ts"
import { characterPassesRequiredCurseState } from "../required-curse-state-filter/required-curse-state-filter.module.code.ts"
import type { RequiredCurseStateCondition } from "../required-curse-state-filter-types/required-curse-state-filter-types.module.code.ts"
import { characterPassesRequiredSkillLines } from "../required-skill-lines-filter/required-skill-lines-filter.module.code.ts"
import type { RequiredSkillLinesCondition } from "../required-skill-lines-filter-types/required-skill-lines-filter-types.module.code.ts"
import type { RuleMatcherContext } from "../rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import type { CharacterId } from "../use-destination-types/use-destination-types.module.code.ts"

export interface CharEligibilityConditions {
  readonly requiredSkillLines?: RequiredSkillLinesCondition
  readonly requiredCurseState?: RequiredCurseStateCondition
  readonly canLevelMorphs?: CanLevelMorphsCondition
}

export interface EligibilityResolvers {
  readonly getCharacterSkillLineRanks: RuleMatcherContext["getCharacterSkillLineRanks"]
  readonly getCharacterCurseState: RuleMatcherContext["getCharacterCurseState"]
  readonly getCharacterCanLevelMorphs: RuleMatcherContext["getCharacterCanLevelMorphs"]
}

export function composeCharEligibilityPredicate(
  conditions: CharEligibilityConditions | undefined,
  resolvers: EligibilityResolvers
): (charId: CharacterId) => boolean {
  if (conditions === undefined) return () => true

  const skillCond = conditions.requiredSkillLines
  const skillActive = skillCond !== undefined && skillCond.skillLineIds.length > 0

  const curseCond = conditions.requiredCurseState
  const curseActive = curseCond !== undefined

  const morphsCond = conditions.canLevelMorphs
  const morphsActive = morphsCond !== undefined

  if (!skillActive && !curseActive && !morphsActive) return () => true

  return (charId: CharacterId) => {
    if (skillActive && skillCond !== undefined) {
      const resolve = resolvers.getCharacterSkillLineRanks
      if (resolve !== undefined && !characterPassesRequiredSkillLines(charId, skillCond, resolve)) {
        return false
      }
    }
    if (curseActive && curseCond !== undefined) {
      const resolve = resolvers.getCharacterCurseState
      if (resolve !== undefined && !characterPassesRequiredCurseState(charId, curseCond, resolve)) {
        return false
      }
    }
    if (morphsActive && morphsCond !== undefined) {
      const resolve = resolvers.getCharacterCanLevelMorphs
      if (resolve !== undefined && !characterPassesCanLevelMorphs(charId, morphsCond, resolve)) {
        return false
      }
    }
    return true
  }
}
