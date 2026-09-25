import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const infernalGuardian = {
  id: "019e6484-5ffd-7eba-99d5-fbe17911d79c",
  type: "page-type/temper-set",
  slug: "infernal-guardian",
  title: "Infernal Guardian",
  key: "infernal-guardian",
  esoSetId: 272,
  esoItemIds: [94516, 94652, 94788, 94924, 95060, 95196],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
