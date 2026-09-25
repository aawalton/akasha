import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const priorThierric = {
  id: "019e6484-6010-7f50-8891-508be8230ba2",
  type: "page-type/temper-set",
  slug: "prior-thierric",
  title: "Prior Thierric",
  key: "prior-thierric",
  esoSetId: 608,
  esoItemIds: [178571, 178577, 178583, 178589, 178595, 178601],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
