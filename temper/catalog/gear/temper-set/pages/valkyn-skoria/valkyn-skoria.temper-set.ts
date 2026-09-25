import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const valkynSkoria = {
  id: "019e6484-6021-7dd6-8949-0a91264ce102",
  type: "page-type/temper-set",
  slug: "valkyn-skoria",
  title: "Valkyn Skoria",
  key: "valkyn-skoria",
  esoSetId: 169,
  esoItemIds: [59632, 59638, 59644, 59650, 59656, 59662],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
