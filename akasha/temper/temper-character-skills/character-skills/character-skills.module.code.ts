import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillTemplate } from "../character-skill-template/character-skill-template.module.code.ts"
import { skillsFromPages } from "../character-skills-from-pages/character-skills-from-pages.module.code.ts"
import { scribedSkills } from "../scribed-skills/scribed-skills.module.code.ts"

const SKILLS_DATA = {
  ...skillsFromPages.data,
  ...scribedSkills.data,
}

export const skills: DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none"> =
  createDataFile<SkillTemplate>()(SKILLS_DATA)

export type SkillId = (typeof skills.ids)[number]

export type Skill = SkillTemplate & { id: SkillId }
