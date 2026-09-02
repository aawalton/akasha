import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface CompanionSkillSlotTemplate {
  id: string
  name: string
}

const COMPANION_SKILL_SLOT_DATA = {
  "active-1": { id: "active-1", name: "Active 1" },
  "active-2": { id: "active-2", name: "Active 2" },
  "active-3": { id: "active-3", name: "Active 3" },
  "active-4": { id: "active-4", name: "Active 4" },
  "active-5": { id: "active-5", name: "Active 5" },
  "ultimate": { id: "ultimate", name: "Ultimate" },
} as const satisfies Record<string, CompanionSkillSlotTemplate>

export const companionSkillSlots =
  createDataFile<CompanionSkillSlotTemplate>()(COMPANION_SKILL_SLOT_DATA)

export type CompanionSkillSlotId = (typeof companionSkillSlots.ids)[number]
