import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import { ALLIANCE_WAR_SKILL_LINES } from "../alliance-war-skill-lines/alliance-war-skill-lines.module.code.ts"
import { CLASS_SKILL_LINES } from "../class-skill-lines/class-skill-lines.module.code.ts"
import { COMPANION_SKILL_LINES } from "../companion-skill-lines/companion-skill-lines.module.code.ts"
import { RACIAL_AND_CRAFT_SKILL_LINES } from "../racial-and-craft-skill-lines/racial-and-craft-skill-lines.module.code.ts"
import type { SkillLineTemplate } from "../skill-line-template/skill-line-template.module.code.ts"
import { VENGEANCE_SKILL_LINES } from "../vengeance-skill-lines/vengeance-skill-lines.module.code.ts"
import { WEAPON_AND_ARMOR_SKILL_LINES } from "../weapon-and-armor-skill-lines/weapon-and-armor-skill-lines.module.code.ts"
import { WORLD_AND_GUILD_SKILL_LINES } from "../world-and-guild-skill-lines/world-and-guild-skill-lines.module.code.ts"

const SKILL_LINES_DATA = {
  "no-skill-line": {
    id: "no-skill-line" as const,
    name: "No Skill Line",
    subcategoryId: "none" as const,
    displayOrder: 0,
    esoSkillLineId: 0,
    maxRank: 0,
  },
  ...CLASS_SKILL_LINES,
  ...WEAPON_AND_ARMOR_SKILL_LINES,
  ...WORLD_AND_GUILD_SKILL_LINES,
  ...ALLIANCE_WAR_SKILL_LINES,
  ...RACIAL_AND_CRAFT_SKILL_LINES,
  ...COMPANION_SKILL_LINES,
  ...VENGEANCE_SKILL_LINES,
} satisfies Record<string, SkillLineTemplate>

export const skillLines = createDataFile<SkillLineTemplate>()(SKILL_LINES_DATA)

export type SkillLineId = (typeof skillLines.ids)[number]

function computeSkillLinesByClass(): Readonly<Record<string, readonly SkillLineId[]>> {
  const grouped: Record<string, SkillLineId[]> = {}
  for (const line of skillLines.list) {
    if (!("class" in line) || line.class === undefined) continue
    const classId: string = line.class
    const existing = grouped[classId]
    if (existing) {
      existing.push(line.id)
    } else {
      grouped[classId] = [line.id]
    }
  }
  return grouped
}

const skillLinesByClass = computeSkillLinesByClass()

const EMPTY_SKILL_LINE_IDS: readonly SkillLineId[] = []

export function getSkillLineIdsForClass(classId: string): readonly SkillLineId[] {
  return skillLinesByClass[classId] ?? EMPTY_SKILL_LINE_IDS
}
