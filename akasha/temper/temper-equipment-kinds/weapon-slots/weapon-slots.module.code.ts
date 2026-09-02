import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface WeaponSlotTemplate {
  id: string
  name: string
  icon?: string
}

const WEAPON_SLOT_DATA = {
  "main-hand": {
    id: "main-hand" as const,
    name: "Main Hand",
    icon: "/resources/gearslot_mainhand.png",
  },
  "off-hand": {
    id: "off-hand" as const,
    name: "Off Hand",
    icon: "/resources/gearslot_offhand.png",
  },
  "poison": { id: "poison" as const, name: "Poison" },
} satisfies Record<string, WeaponSlotTemplate>

export const weaponSlots = createDataFile<WeaponSlotTemplate>()(WEAPON_SLOT_DATA)

export type WeaponSlot = (typeof weaponSlots.ids)[number]
