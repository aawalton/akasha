import {
  companionSlotAt,
  slotTableOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

const COMPANION_SKILL_SLOT_DATA = [
  "active-1",
  "active-2",
  "active-3",
  "active-4",
  "active-5",
  "ultimate",
] as const

export type CompanionSkillSlotId = (typeof COMPANION_SKILL_SLOT_DATA)[number]

export const companionSkillSlots = slotTableOf<
  CompanionSkillSlotId,
  { readonly id: CompanionSkillSlotId; readonly name: string }
>(COMPANION_SKILL_SLOT_DATA, (catalog, id) => ({
  id,
  name: companionSlotAt(catalog.slots.skill, id).name,
}))
