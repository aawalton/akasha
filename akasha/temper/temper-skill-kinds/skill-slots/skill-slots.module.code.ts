import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface SkillSlotTemplate {
  id: string
  name: string
}

const SKILL_SLOT_DATA = {
  "active-1": { id: "active-1", name: "Active 1" },
  "active-2": { id: "active-2", name: "Active 2" },
  "active-3": { id: "active-3", name: "Active 3" },
  "active-4": { id: "active-4", name: "Active 4" },
  "active-5": { id: "active-5", name: "Active 5" },
  "ultimate": { id: "ultimate", name: "Ultimate" },
} as const satisfies Record<string, SkillSlotTemplate>

export const skillSlots = createDataFile<SkillSlotTemplate>()(SKILL_SLOT_DATA)

export type SkillSlotId = (typeof skillSlots.ids)[number]

export const activeSkillSlots = skillSlots.list.filter((slot) => slot.id !== "ultimate")
