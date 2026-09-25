import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const balorgh = {
  id: "019e6484-5fed-7af8-b50c-5b22a0e924e8",
  type: "page-type/temper-set",
  slug: "balorgh",
  title: "Balorgh",
  key: "balorgh",
  esoSetId: 397,
  esoItemIds: [141622, 141623, 141624, 141625, 141626, 141627],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
