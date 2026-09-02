import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface ArmorSlotTemplate {
  id: string
  name: string
  icon: string
}

const ARMOR_SLOT_DATA = {
  "head": { id: "head" as const, name: "Head", icon: "/resources/gearslot_head.png" },
  "shoulders": {
    id: "shoulders" as const,
    name: "Shoulders",
    icon: "/resources/gearslot_shoulders.png",
  },
  "chest": { id: "chest" as const, name: "Chest", icon: "/resources/gearslot_chest.png" },
  "hands": { id: "hands" as const, name: "Hands", icon: "/resources/gearslot_hands.png" },
  "waist": { id: "waist" as const, name: "Waist", icon: "/resources/gearslot_belt.png" },
  "legs": { id: "legs" as const, name: "Legs", icon: "/resources/gearslot_legs.png" },
  "feet": { id: "feet" as const, name: "Feet", icon: "/resources/gearslot_feet.png" },
} satisfies Record<string, ArmorSlotTemplate>

export const armorSlots = createDataFile<ArmorSlotTemplate>()(ARMOR_SLOT_DATA)

export type ArmorSlotId = (typeof armorSlots.ids)[number]
