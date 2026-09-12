import { DO_NOT_EDIT } from "akasha/temper/addon-generators/do-not-edit/do-not-edit.module.code.ts"
import { companionSkills } from "akasha/temper/companions-core/modules/companion-skills/companion-skills.module.code.ts"

export function generateSkillMappings(): string {
  const entries: string[] = []
  const seen = new Set<number>()
  for (const [i, id] of companionSkills.ids.entries()) {
    const skill = companionSkills.data[id]
    if (skill === undefined) continue
    if (skill.abilityId === 0) continue
    if (seen.has(skill.abilityId)) continue
    seen.add(skill.abilityId)
    entries.push(`  [${skill.abilityId}]: ${i}, // ${skill.name}`)
  }

  return `\
/**
 * Skill Mappings (Generated)
 *
 * Maps ESO ability IDs to temper skill indices.
 * Source: engine/companions/skills/companion-skills-data.ts
 *
 * ${DO_NOT_EDIT}
 */

export const SKILL_ABILITY_ID_TO_INDEX: Record<number, number> = {
${entries.join("\n")}
}

export function getSkillIndex(abilityId: number): number {
  return SKILL_ABILITY_ID_TO_INDEX[abilityId] ?? 0
}
`
}
