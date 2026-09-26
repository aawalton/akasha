import {
  companionSlotAt,
  slotTableOf,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

const COMPANION_WEAPON_SLOT_DATA = ["main-hand", "off-hand"] as const

export type CompanionWeaponSlotId = (typeof COMPANION_WEAPON_SLOT_DATA)[number]

export const companionWeaponSlots = slotTableOf<
  CompanionWeaponSlotId,
  { readonly id: CompanionWeaponSlotId; readonly name: string }
>(COMPANION_WEAPON_SLOT_DATA, (catalog, id) => ({
  id,
  name: companionSlotAt(catalog.slots.weapon, id).name,
}))
