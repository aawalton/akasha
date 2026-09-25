import type { TemperSet } from "akasha/temper/catalog/gear/temper-set/temper-set.page-type.types.ts"

export const ladyMalygda = {
  id: "019e6484-6001-7c46-ab5e-e0ed63a67388",
  type: "page-type/temper-set",
  slug: "lady-malygda",
  title: "Lady Malygda",
  key: "lady-malygda",
  esoSetId: 635,
  esoItemIds: [183959, 183965, 183971, 183977, 183983, 183989],
  esoArmorTypes: ["ARMORTYPE_HEAVY", "ARMORTYPE_LIGHT", "ARMORTYPE_MEDIUM"],
  esoEquipTypes: ["EQUIP_TYPE_HEAD", "EQUIP_TYPE_SHOULDERS"],
  category: "temper-set-category/monster",
  valid: ["monster"],
  bonuses: "jsonl",
  icons: "jsonl",
} as const satisfies TemperSet
