import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

type Passive = {
  abilityId: number
  name: string
  description: string
}

function passivesBought(skillType: number, passives: Passive[]): Passive[] {
  const lines = GetNumSkillLines(skillType)
  for (let lineIndex = 1; lineIndex <= lines; lineIndex++) {
    const abilities = GetNumSkillAbilities(skillType, lineIndex)
    for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
      if (!IsSkillAbilityPassive(skillType, lineIndex, skillIndex)) continue
      if (!IsSkillAbilityPurchased(skillType, lineIndex, skillIndex)) continue
      const abilityId = GetSkillAbilityId(skillType, lineIndex, skillIndex, false)
      passives.push({
        abilityId,
        name: zo_strformat("<<1>>", GetAbilityName(abilityId, "player")),
        description: GetAbilityDescription(abilityId, undefined, "player"),
      })
    }
  }
  return passives
}

export function classPassives(): Passive[] {
  return passivesBought(SKILL_TYPE_CLASS, [])
}

const OTHER_PASSIVE_TYPES = [
  SKILL_TYPE_WEAPON,
  SKILL_TYPE_ARMOR,
  SKILL_TYPE_WORLD,
  SKILL_TYPE_GUILD,
  SKILL_TYPE_AVA,
  SKILL_TYPE_RACIAL,
]

export function otherPassives(): Passive[] {
  const passives: Passive[] = []
  for (const skillType of OTHER_PASSIVE_TYPES) passivesBought(skillType, passives)
  return passives
}
