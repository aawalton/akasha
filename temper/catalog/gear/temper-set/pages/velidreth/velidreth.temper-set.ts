import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const velidreth = {
  id: "019e6484-6022-7d0b-a062-73b5e900418f",
  type: "page-type/temper-set",
  slug: "velidreth",
  title: "Velidreth",
  key: "velidreth",
  esoSetId: 257,
  esoItemIds: [82128, 82129, 82130, 82131, 82132, 82133],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
