import {
  companionCatalog,
  companionSkillAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"
import type { CompanionSkillTemplate } from "akasha/temper/catalog/companion/companions-core/modules/companion-skill-activation-effect-types/companion-skill-activation-effect-types.module.code.ts"

const NO_SKILL = "no-skill"

const NO_COMPANION = "no-companion"

function slottableBy(skill: CompanionSkillTemplate, companionId: string): boolean {
  return skill.companionId === null || skill.companionId === companionId
}

export function getAllSkillsForCompanion(companionId: string): readonly CompanionSkillTemplate[] {
  return companionCatalog().skills.filter((skill) => slottableBy(skill, companionId))
}

export function getDefaultUltimateForCompanion(companionId: string): string {
  if (companionId === NO_COMPANION) return NO_SKILL
  for (const skill of companionCatalog().skills) {
    if (slottableBy(skill, companionId) && skill.skillType === "ultimate") return skill.id
  }
  return NO_SKILL
}

export function isSkillValidForCompanion(skillId: string, companionId: string): boolean {
  if (skillId === NO_SKILL) return true
  return slottableBy(companionSkillAt(skillId), companionId)
}
