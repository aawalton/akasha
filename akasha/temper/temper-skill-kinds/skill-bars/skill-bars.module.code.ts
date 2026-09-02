import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface SkillBarTemplate {
  id: string
  name: string
}

const SKILL_BAR_DATA = {
  "primary-skill-bar": { id: "primary-skill-bar", name: "Primary Bar" },
  "backup-skill-bar": { id: "backup-skill-bar", name: "Backup Bar" },
} as const satisfies Record<string, SkillBarTemplate>

export const skillBars = createDataFile<SkillBarTemplate>()(SKILL_BAR_DATA)

export type SkillBarId = (typeof skillBars.ids)[number]
