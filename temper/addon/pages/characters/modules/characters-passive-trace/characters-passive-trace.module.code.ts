import { getBaseAbilityId } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-base-ability/character-capture-base-ability.module.code.ts"
import { getPassiveBitmaskIndex } from "akasha/temper/capture/characters-capture-addon/modules/character-capture-passive-map/character-capture-passive-map.module.code.ts"
import {
  getSavedVariables,
  type PassiveTraceRow,
} from "akasha/temper/player/completion/temper-player-completion/state/modules/completion-saved-variables/completion-saved-variables.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-04/eso-enums-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

const RANKS_LISTED = 4

export function capturePassiveTrace(): undefined {
  const rows: PassiveTraceRow[] = []
  for (const skillType of [SKILL_TYPE_CLASS, SKILL_TYPE_ARMOR]) {
    const lines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= lines; lineIndex++) {
      const [line] = GetSkillLineInfo(skillType, lineIndex)
      const abilities = GetNumSkillAbilities(skillType, lineIndex)
      for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
        if (!IsSkillAbilityPassive(skillType, lineIndex, skillIndex)) continue
        const [name] = GetSkillAbilityInfo(skillType, lineIndex, skillIndex)
        const currentId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
        const baseId = getBaseAbilityId(currentId)
        const rankIds: number[] = []
        for (let rank = 1; rank <= RANKS_LISTED; rank++) {
          const [abilityId] = GetSpecificSkillAbilityInfo(skillType, lineIndex, skillIndex, 0, rank)
          rankIds.push(abilityId)
        }
        rows.push({
          line,
          name,
          purchased: IsSkillAbilityPurchased(skillType, lineIndex, skillIndex),
          currentId,
          baseId,
          rankIds,
          bitmaskIndex: getPassiveBitmaskIndex(baseId) ?? -1,
          description: GetAbilityDescription(currentId),
        })
      }
    }
  }
  getSavedVariables().passiveTrace = rows
}
