import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-04/eso-functions-04.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-10/eso-functions-10.type-declaration.d.ts"

type ClassMasteryPassive = {
  abilityId: number
  name: string
  description: string
  purchased: boolean
}

type ClassMasteryLine = {
  skillLineId: number
  name: string
  classId: number
  passives: ClassMasteryPassive[]
}

function passivesOn(lineIndex: number): ClassMasteryPassive[] {
  const passives: ClassMasteryPassive[] = []
  const abilities = GetNumSkillAbilities(SKILL_TYPE_CLASS, lineIndex)
  for (let skillIndex = 1; skillIndex <= abilities; skillIndex++) {
    const abilityId = GetSkillAbilityId(SKILL_TYPE_CLASS, lineIndex, skillIndex, false)
    passives.push({
      abilityId,
      name: zo_strformat("<<1>>", GetAbilityName(abilityId, "player")),
      description: GetAbilityDescription(abilityId, undefined, "player"),
      purchased: IsSkillAbilityPurchased(SKILL_TYPE_CLASS, lineIndex, skillIndex),
    })
  }
  return passives
}

export function classMasteryLines(): ClassMasteryLine[] {
  const lines: ClassMasteryLine[] = []
  const count = GetNumSkillLines(SKILL_TYPE_CLASS)
  for (let lineIndex = 1; lineIndex <= count; lineIndex++) {
    const [, , , , , , isClassMastery] = GetSkillLineDynamicInfo(SKILL_TYPE_CLASS, lineIndex)
    if (!isClassMastery) continue
    const [name, , , skillLineId] = GetSkillLineInfo(SKILL_TYPE_CLASS, lineIndex)
    lines.push({
      skillLineId: skillLineId ?? 0,
      name: zo_strformat("<<1>>", name ?? ""),
      classId: GetSkillLineClassId(SKILL_TYPE_CLASS, lineIndex),
      passives: passivesOn(lineIndex),
    })
  }
  return lines
}
