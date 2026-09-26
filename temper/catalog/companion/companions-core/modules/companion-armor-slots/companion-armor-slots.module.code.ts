import {
  companionSlotAt,
  slotTableOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

const COMPANION_ARMOR_SLOT_DATA = [
  "head",
  "shoulders",
  "chest",
  "hands",
  "waist",
  "legs",
  "feet",
] as const

export type CompanionArmorSlotId = (typeof COMPANION_ARMOR_SLOT_DATA)[number]

interface CompanionArmorSlotTemplate {
  readonly id: CompanionArmorSlotId
  readonly name: string
  readonly equipType: number
}

export const companionArmorSlots = slotTableOf<CompanionArmorSlotId, CompanionArmorSlotTemplate>(
  COMPANION_ARMOR_SLOT_DATA,
  (catalog, id) => {
    const slot = companionSlotAt(catalog.slots.armor, id)
    if (slot.equipType === null) throw new Error(`the armor slot ${id} states no equip type`)
    return { id, name: slot.name, equipType: slot.equipType }
  }
)
