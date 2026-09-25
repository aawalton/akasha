import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const domihaus = {
  id: "019e6484-5ff2-7ceb-b39a-3b131132b67d",
  type: "page-type/temper-set",
  slug: "domihaus",
  title: "Domihaus",
  key: "domihaus",
  esoSetId: 342,
  esoItemIds: [128308, 128316, 128324, 128332, 128340, 128348],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
