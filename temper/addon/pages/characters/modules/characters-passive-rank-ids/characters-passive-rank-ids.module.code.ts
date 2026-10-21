import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"

const PASSIVE_SKILL_TYPES = [
  SKILL_TYPE_CLASS,
  SKILL_TYPE_WEAPON,
  SKILL_TYPE_ARMOR,
  SKILL_TYPE_WORLD,
  SKILL_TYPE_GUILD,
  SKILL_TYPE_AVA,
  SKILL_TYPE_RACIAL,
  SKILL_TYPE_TRADESKILL,
]

const PASSIVE_RANKS_TRIED = 10

export function passiveRankIds(): number[][] {
  const passives: number[][] = []
  for (const skillType of PASSIVE_SKILL_TYPES) {
    const lines = GetNumSkillLines(skillType)
    for (let lineIndex = 1; lineIndex <= lines; lineIndex++) {
      const abilities = GetNumSkillAbilities(skillType, lineIndex)
      for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
        if (!IsSkillAbilityPassive(skillType, lineIndex, skillIndex)) continue
        const ids: number[] = []
        for (let rank = 1; rank <= PASSIVE_RANKS_TRIED; rank++) {
          const [abilityId] = GetSpecificSkillAbilityInfo(skillType, lineIndex, skillIndex, 0, rank)
          if (abilityId === 0) break
          ids.push(abilityId)
        }
        if (ids.length > 0) passives.push(ids)
      }
    }
  }
  return passives
}
