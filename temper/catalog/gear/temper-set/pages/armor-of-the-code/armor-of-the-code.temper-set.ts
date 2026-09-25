import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const armorOfTheCode = {
  id: "019e6484-6046-7084-9dfd-723b3d203577",
  type: "page-type/temper-set",
  slug: "armor-of-the-code",
  title: "Armor of the Code",
  key: "armor-of-the-code",
  esoSetId: 209,
  hashPlace: 25,
  esoItemIds: [
    137543, 137585, 137627, 137669, 137711, 137753, 137795, 137837, 139704, 139746, 139794, 139836,
    139884, 139926, 139974, 140016, 140064, 140106, 140154, 140196,
  ],
  esoEquipTypes: ["EQUIP_TYPE_NECK", "EQUIP_TYPE_RING"],
  category: "temper-set-category/other",
  valid: ["jewelry:*"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
