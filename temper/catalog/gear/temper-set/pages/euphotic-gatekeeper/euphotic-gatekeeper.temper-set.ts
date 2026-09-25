import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const euphoticGatekeeper = {
  id: "019e6484-5ff6-7fa1-943a-2d85b41f0363",
  type: "page-type/temper-set",
  slug: "euphotic-gatekeeper",
  title: "Euphotic Gatekeeper",
  key: "euphotic-gatekeeper",
  esoSetId: 667,
  esoItemIds: [189407, 189413, 189419, 189425, 189431, 189437],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
