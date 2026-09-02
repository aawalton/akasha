import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface ArmorTypeTemplate {
  id: string
  name: string
  armorMultiplier: number
  isLargeEnchantSlot: boolean
  validSlots: readonly string[]
}

const ARMOR_TYPE_DATA = {
  "chest": {
    id: "chest" as const,
    name: "Chest",
    armorMultiplier: 8,
    isLargeEnchantSlot: true,
    validSlots: ["chest"] as const,
  },
  "feet": {
    id: "feet" as const,
    name: "Feet",
    armorMultiplier: 7,
    isLargeEnchantSlot: false,
    validSlots: ["feet"] as const,
  },
  "hands": {
    id: "hands" as const,
    name: "Hands",
    armorMultiplier: 4,
    isLargeEnchantSlot: false,
    validSlots: ["hands"] as const,
  },
  "head": {
    id: "head" as const,
    name: "Head",
    armorMultiplier: 7,
    isLargeEnchantSlot: true,
    validSlots: ["head"] as const,
  },
  "legs": {
    id: "legs" as const,
    name: "Legs",
    armorMultiplier: 7,
    isLargeEnchantSlot: true,
    validSlots: ["legs"] as const,
  },
  "shield": {
    id: "shield" as const,
    name: "Shield",
    armorMultiplier: 1,
    isLargeEnchantSlot: true,
    validSlots: ["off-hand"] as const,
  },
  "shoulders": {
    id: "shoulders" as const,
    name: "Shoulders",
    armorMultiplier: 7,
    isLargeEnchantSlot: false,
    validSlots: ["shoulders"] as const,
  },
  "waist": {
    id: "waist" as const,
    name: "Waist",
    armorMultiplier: 3,
    isLargeEnchantSlot: false,
    validSlots: ["waist"] as const,
  },
} satisfies Record<string, ArmorTypeTemplate>

export const armorTypes = createDataFile<ArmorTypeTemplate>()(ARMOR_TYPE_DATA)

export type ArmorTypeId = (typeof armorTypes.ids)[number]

export type StandardArmorType = Exclude<ArmorTypeId, "shield">

export function isLargeArmorEnchantSlot(slot: ArmorTypeId): boolean {
  return armorTypes.data[slot].isLargeEnchantSlot
}

export function getArmorMultiplier(slot: ArmorTypeId): number {
  return armorTypes.data[slot].armorMultiplier
}
