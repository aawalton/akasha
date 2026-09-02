import { skills } from "@akasha/temper-character-skills/character-skills"
export function generatePlayerSkillMappings(): string {
  const indexEntries: string[] = []
  const temperIdEntries: string[] = []
  const seen = new Set<number>()
  for (const [i, id] of skills.ids.entries()) {
    const skill = skills.data[id]
    if (skill === undefined) continue
    if (skill.esoSkillId === 0) continue
    if (seen.has(skill.esoSkillId)) continue
    seen.add(skill.esoSkillId)
    indexEntries.push(`  [${skill.esoSkillId}]: ${i}, // ${skill.name}`)
    temperIdEntries.push(`  [${skill.esoSkillId}]: "${skill.id}", // ${skill.name}`)
  }

  return `\
/**
 * Player Skill Mappings (Generated)
 *
 * Maps ESO skill IDs to temper indices and string IDs.
 * Source: engine/skills/skills-data.ts
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

export const SKILL_ESO_ID_TO_INDEX: Record<number, number> = {
${indexEntries.join("\n")}
}

export const SKILL_ESO_ID_TO_TEMPER_ID: Record<number, string> = {
${temperIdEntries.join("\n")}
}

export function getPlayerSkillIndex(esoSkillId: number): number {
  return SKILL_ESO_ID_TO_INDEX[esoSkillId] ?? 0
}

export function getPlayerSkillTemperId(esoSkillId: number): string {
  return SKILL_ESO_ID_TO_TEMPER_ID[esoSkillId] ?? "no-skill"
}
`
}
