import {
  companionSlotAt,
  slotTableOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

const COMPANION_JEWELRY_SLOT_DATA = ["necklace", "ring-1", "ring-2"] as const

export type CompanionJewelrySlotId = (typeof COMPANION_JEWELRY_SLOT_DATA)[number]

interface CompanionJewelrySlotTemplate {
  readonly id: CompanionJewelrySlotId
  readonly name: string
  readonly equipType: number
  readonly slotCategory: string
}

export const companionJewelrySlots = slotTableOf<
  CompanionJewelrySlotId,
  CompanionJewelrySlotTemplate
>(COMPANION_JEWELRY_SLOT_DATA, (catalog, id) => {
  const slot = companionSlotAt(catalog.slots.jewelry, id)
  if (slot.equipType === null || slot.slotCategory === null) {
    throw new Error(`the jewelry slot ${id} states no equip type or no slot category`)
  }
  return { id, name: slot.name, equipType: slot.equipType, slotCategory: slot.slotCategory }
})
